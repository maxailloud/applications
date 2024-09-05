import { KeyValuePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import PropertyDataService from '@data-services/property-data.service';
import DataStore from '@stores/data.store';

@Component({
    selector: 'propertea-property-list',
    standalone: true,
    templateUrl: 'list.component.html',
    styleUrl: 'list.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        RouterLink,
        KeyValuePipe,
    ]
})
export default class ListComponent {
    public propertyDataService = inject(PropertyDataService);
    public dataStore = inject(DataStore);

    private dataFromStore = this.dataStore.getData();

    public computedData = computed(() => this.dataFromStore().values());

    public async deleteProperty(propertyId: string): Promise<void> {
        try {
            await this.propertyDataService.deleteProperty(propertyId);

            // remove property from store, it should automatically refresh the list
            //await this.refreshProperties();
        } catch (error) {
            if (error instanceof Error) {
                console.error(error);
            }
        }
    }
}

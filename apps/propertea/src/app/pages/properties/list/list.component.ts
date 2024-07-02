import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PropertyDataService } from '@data-services/property-data.service';
import { SelectProperty } from '@schema/schema';

@Component({
    selector: 'propertea-property-list',
    standalone: true,
    templateUrl: 'list.component.html',
    styleUrl: 'list.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        RouterLink,
    ]
})
export default class ListComponent implements OnInit {
    public propertyDataService = inject(PropertyDataService);

    public isLoading = signal<boolean>(true);
    public properties = signal<SelectProperty[]>([]);

    public async ngOnInit(): Promise<void> {
        try {
            const {data: properties, error, status} = await this.propertyDataService.readProperties();

            if (error) {
                console.error(error, status);
            }

            if (properties) {
                this.properties.set(properties);
            }
        } catch (error) {
            if (error instanceof Error) {
                console.error(error);
            }

            this.isLoading.set(false);
        } finally {
            this.isLoading.set(false);
        }
    }
}

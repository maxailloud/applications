import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { PropertyDataService } from '@data-services/property-data.service';
import { PropertyFormFactory } from '@factories/property-form.factory';
import { SessionStore } from '@stores/session.store';

@Component({
    selector: 'propertea-property-create',
    standalone: true,
    templateUrl: 'create.component.html',
    styleUrl: 'create.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        RouterLink,
        ReactiveFormsModule,
    ],
    providers: [
        PropertyFormFactory,
    ],
})
export default class CreateComponent {
    public isLoading = signal<boolean>(false);
    public createPropertyForm = inject(PropertyFormFactory).createForm();
    public propertyDataService = inject(PropertyDataService);
    public sessionStore = inject(SessionStore);

    public async createProperty(): Promise<void> {
        console.log('createProperty');
        console.log(this.createPropertyForm.value);

        try {
            this.isLoading.set(true);

            const name = this.createPropertyForm.value.name as string;
            const address = this.createPropertyForm.value.address as string;

            const {error} = await this.propertyDataService.createProperty(name, address, this.sessionStore.getSession().user.id);

            if (error) throw error;
        } catch (error) {
            if (error instanceof Error) {
                alert(error.message);
            }

            this.isLoading.set(false);
        } finally {
            this.isLoading.set(false);
        }
    }
}

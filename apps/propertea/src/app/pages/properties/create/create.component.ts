import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
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
    public createPropertyForm = inject(PropertyFormFactory).createForm();
    public propertyDataService = inject(PropertyDataService);
    public sessionStore = inject(SessionStore);
    public router = inject(Router);

    public isLoading = signal<boolean>(false);

    public async createProperty(): Promise<void> {
        if (this.createPropertyForm.valid) {
            try {
                this.isLoading.set(true);

                const { data: properties, error } = await this.propertyDataService.createProperty(
                    this.createPropertyForm.controls.name.value,
                    this.createPropertyForm.controls.address.value,
                    this.sessionStore.getSession().user.id,
                );

                if (error) {
                    console.error(error);
                }

                if (properties) {
                    void this.router.navigate(['properties', 'detail', properties[0].id]);
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
}

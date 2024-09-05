import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import PropertyDataService from '@data-services/property-data.service';
import { PropertyFormFactory } from '@factories/property-form.factory';
import { SelectProperty } from '@schema/schema';
import { SessionStore } from '@stores/session.store';

@Component({
    selector: 'propertea-property-create-update',
    standalone: true,
    templateUrl: 'create-update.component.html',
    styleUrl: 'create-update.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        RouterLink,
        ReactiveFormsModule,
    ],
    providers: [
        PropertyFormFactory,
    ],
})
export default class CreateUpdateComponent {
    private propertyFormFactory = inject(PropertyFormFactory);
    private propertyDataService = inject(PropertyDataService);
    private sessionStore = inject(SessionStore);
    private router = inject(Router);
    private activatedRoute = inject(ActivatedRoute);

    public createPropertyForm;
    public isLoading = signal<boolean>(false);
    public property?: SelectProperty;
    public pageActionTitle = signal<string>('Property Creation');
    public actionTitle = signal<string>('Create');

    public constructor() {
        this.property = this.activatedRoute.snapshot.data.property;
        this.createPropertyForm = this.propertyFormFactory.createForm(this.property);

        if (this.property) {
            this.pageActionTitle.set('Property Update');
            this.actionTitle.set('Update');
        }
    }

    public async createProperty(): Promise<void> {
        if (this.createPropertyForm.valid) {
            try {
                this.isLoading.set(true);

                if (!this.property) {
                    const { data: property, error } = await this.propertyDataService.createProperty({
                        name: this.createPropertyForm.controls.name.value,
                        address: this.createPropertyForm.controls.address.value,
                        rent: this.createPropertyForm.controls.rent.value,
                        mortgage: this.createPropertyForm.controls.mortgage.value,
                        userId: this.sessionStore.getSession().user.id,
                    });

                    if (error) {
                        console.error(error);
                    }

                    if (property) {
                        void this.router.navigate(['properties', 'detail', property.id]);
                    }
                } else {
                    const { error } = await this.propertyDataService.updateProperty({
                        id: this.property.id,
                        name: this.createPropertyForm.controls.name.value,
                        address: this.createPropertyForm.controls.address.value,
                        rent: this.createPropertyForm.controls.rent.value,
                        mortgage: this.createPropertyForm.controls.mortgage.value,
                        userId: this.sessionStore.getSession().user.id,
                        createdAt: new Date(),
                        updatedAt: new Date(),
                    });

                    if (error) {
                        console.error(error);
                    }

                    void this.router.navigate(['properties']);
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

import { ChangeDetectionStrategy, Component, computed, inject, input, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import CurrencySelectorComponent from '@components/currency-selector/currency-selector.component';
import IconSelectorComponent from '@components/icon-selector/icon-selector.component';
import GroupDataService from '@data-services/group-data.service';
import { GroupFormFactory } from '@forms/group-form.factory';
import { GroupForm } from '@forms/group-form.type';
import {
    IonBackButton,
    IonButton,
    IonButtons,
    IonCol,
    IonContent,
    IonGrid,
    IonHeader,
    IonIcon,
    IonInput,
    IonItem,
    IonItemDivider,
    IonLabel,
    IonList,
    IonRow,
    IonTitle,
    IonToolbar,
} from '@ionic/angular/standalone';
import { SelectGroup, SelectUser } from '@schema/schema';
import ToastService from '@services/toast.service';
import GroupStore from '@stores/group.store';
import { debounceTime } from 'rxjs';

@Component({
    selector: 'splitdumb-group-settings',
    standalone: true,
    templateUrl: './settings.page.html',
    styleUrls: ['./settings.page.scss'],
    imports: [
        IonItem,
        IonLabel,
        IonHeader,
        IonToolbar,
        IonButtons,
        IonContent,
        IonTitle,
        IonList,
        IonBackButton,
        IonButton,
        IonGrid,
        IonRow,
        IonCol,
        IconSelectorComponent,
        IonInput,
        CurrencySelectorComponent,
        ReactiveFormsModule,
        IonItemDivider,
        IonIcon,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsPage implements OnInit {
    public group = input.required<SelectGroup & { users: SelectUser[] }>();

    private groupDataService = inject(GroupDataService);
    private groupStore = inject(GroupStore);
    private router = inject(Router);
    private toastService = inject(ToastService);

    public users = computed(() => {
        return this.group().users;
    });
    public updateGroupForm!: FormGroup<GroupForm>;

    public ngOnInit(): void {
        this.updateGroupForm = GroupFormFactory.createForm(this.group());

        this.updateGroupForm.controls.name.valueChanges
            .pipe(
                debounceTime(500),
            )
            .subscribe(async (value) => {
                this.updateGroupForm.controls.name.disable({emitEvent: false});

                const {error} = await this.groupDataService.updateGroup(this.group().id, {
                    name: value,
                });

                if (error) {
                    await this.toastService.createErrorToast('Error updating group name');
                }

                this.group().name = value;

                this.updateGroupForm.controls.name.enable({emitEvent: false});
            });

        this.updateGroupForm.controls.icon.valueChanges
            .subscribe(async (value) => {
                this.updateGroupForm.controls.icon.disable({emitEvent: false});

                const {error} = await this.groupDataService.updateGroup(this.group().id, {
                    icon: value,
                });

                if (error) {
                    await this.toastService.createErrorToast('Error updating group icon');
                }

                this.group().icon = value;

                this.updateGroupForm.controls.icon.enable({emitEvent: false});
            });

        this.updateGroupForm.controls.currency.valueChanges
            .subscribe(async (value) => {
                this.updateGroupForm.controls.currency.disable({emitEvent: false});

                const {error} = await this.groupDataService.updateGroup(this.group().id, {
                    currency: value,
                });

                if (error) {
                    await this.toastService.createErrorToast('Error updating group currency');
                }

                this.group().currency = value;

                this.updateGroupForm.controls.currency.enable({emitEvent: false});
            });
    }
}

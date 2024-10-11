import { ChangeDetectionStrategy, Component, inject, viewChild, OnInit, } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import CurrencySelectorComponent from '@components/currency-selector/currency-selector.component';
import IconSelectorComponent from '@components/icon-selector/icon-selector.component';
import GroupDataService from '@data-services/group-data.service';
import { ModalStatus } from '@enums/modal-status.enum';
import { GroupFormFactory } from '@forms/group-form.factory';
import {
    IonButton,
    IonButtons,
    IonCol,
    IonContent,
    IonGrid,
    IonHeader,
    IonIcon,
    IonInput,
    IonItem,
    IonLabel,
    IonList,
    IonModal,
    IonRow,
    IonSelect,
    IonSelectOption,
    IonTitle,
    IonToolbar,
    ModalController,
} from '@ionic/angular/standalone';
import { CurrencySymbolPipe } from '@pipes/currency-symbol.pipe';
import GroupStore from '@stores/group.store';

@Component({
    selector: 'splitdumb-create-group',
    standalone: true,
    templateUrl: './create-group.component.html',
    styleUrls: ['./create-group.component.scss'],
    imports: [
        IonModal,
        IonButton,
        IonButtons,
        IonContent,
        IonHeader,
        IonInput,
        IonItem,
        IonTitle,
        IonToolbar,
        IonIcon,
        ReactiveFormsModule,
        IonList,
        CurrencySelectorComponent,
        IonSelect,
        IonSelectOption,
        IonLabel,
        IonGrid,
        IonRow,
        IonCol,
        CurrencySymbolPipe,
        IconSelectorComponent,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CreateGroupComponent {
    public nameInput = viewChild.required<IonInput>("nameInput");

    private modalController = inject(ModalController);
    private groupDataService = inject(GroupDataService);
    private groupStore = inject(GroupStore);
    private router = inject(Router);

    public createGroupForm = GroupFormFactory.createForm();

    public ionViewDidEnter(): void {
        void this.nameInput().setFocus();
    }

    public get name(): FormControl<string> {
        return this.createGroupForm.controls.name;
    }

    public cancel(): Promise<boolean> {
        this.createGroupForm.reset();
        return this.modalController.dismiss(null, ModalStatus.DISMISS_CANCEL);
    }

    public async create(): Promise<void> {
        if (this.createGroupForm.valid) {
            const {data: group, error} = await this.groupDataService.createGroup({
                name: this.createGroupForm.controls.name.value,
                icon: this.createGroupForm.controls.icon.value,
                currency: this.createGroupForm.controls.currency.value,
                creatorId: '5d6c47f3-60b6-4bc7-9511-4693b464ee00',
            });

            if (error) {
                console.error(error);
            }

            if (group) {
                this.groupStore.addGroup(group);
                void this.modalController.dismiss(group, ModalStatus.DISMISS_CONFIRM);
                void this.router.navigate(['groups', 'detail', group.id]);
            }
        }
    }
}

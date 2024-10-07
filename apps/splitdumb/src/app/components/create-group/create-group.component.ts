import { NgIf } from '@angular/common';
import { Component, inject, } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import GroupDataService from '@data-services/group-data.service';
import { ModalStatus } from '@enums/modal-status.enum';
import { GroupFormFactory } from '@forms/group-form.factory';
import {
    IonButton,
    IonButtons,
    IonContent,
    IonHeader, IonIcon,
    IonInput,
    IonItem,
    IonModal,
    IonTitle,
    IonToolbar,
    ModalController,
} from '@ionic/angular/standalone';

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
        NgIf,
        ReactiveFormsModule,
    ]
})
export default class CreateGroupComponent {
    private modalController = inject(ModalController);
    private groupDataService = inject(GroupDataService);
    private router = inject(Router);

    public groupName = '';
    public createGroupForm = GroupFormFactory.createForm();

    public get name(): FormControl<string> {
        return this.createGroupForm.controls.name;
    }

    public cancel(): Promise<boolean> {
        return this.modalController.dismiss(null, ModalStatus.DISMISS_CANCEL);
    }

    public async create(): Promise<void> {
        if (this.createGroupForm.valid) {
            const {data: group, error} = await this.groupDataService.createGroup({
                name: this.createGroupForm.controls.name.value,
                icon: this.createGroupForm.controls.icon.value,
                creatorId: '5d6c47f3-60b6-4bc7-9511-4693b464ee00',
            });

            if (error) {
                console.error(error);
            }

            if (group) {
                void this.modalController.dismiss(this.groupName, ModalStatus.DISMISS_CONFIRM);

                void this.router.navigate(['groups', 'detail', group.id]);
            }
        }
    }
}

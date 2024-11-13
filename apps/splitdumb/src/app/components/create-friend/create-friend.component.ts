import { ChangeDetectionStrategy, Component, inject, viewChild, } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import FriendDataService from '@data-services/friend-data.service';
import { ModalStatus } from '@enums/modal-status.enum';
import { FriendFormFactory } from '@forms/friend-form.factory';
import {
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonIcon,
    IonInput,
    IonItem,
    IonList,
    IonModal,
    IonTitle,
    IonToolbar,
    ModalController,
} from '@ionic/angular/standalone';
import { FunctionsFetchError, FunctionsHttpError, FunctionsRelayError } from '@supabase/supabase-js';

@Component({
    selector: 'splitdumb-create-friend',
    standalone: true,
    templateUrl: './create-friend.component.html',
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
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CreateFriendComponent {
    public emailInput = viewChild.required<IonInput>('emailInput');

    private modalController = inject(ModalController);
    private friendDataService = inject(FriendDataService);

    public createFriendForm = FriendFormFactory.createForm();

    public ionViewDidEnter(): void {
        void this.emailInput().setFocus();
    }

    public cancel(): Promise<boolean> {
        this.createFriendForm.reset();
        return this.modalController.dismiss(null, ModalStatus.DISMISS_CANCEL);
    }

    public async create(): Promise<void> {
        if (this.createFriendForm.valid) {
            console.log('pouet');
            console.log(this.createFriendForm.value);
            const {data: invitedFriend, error} = await this.friendDataService.inviteFriend(
                this.createFriendForm.controls.email.value,
                this.createFriendForm.controls.username.value,
            );
            console.log(invitedFriend);

            if (error instanceof FunctionsHttpError) {
                const errorMessage = await error.context.json();
                console.log('Function returned an error', errorMessage);
            } else if (error instanceof FunctionsRelayError) {
                console.log('Relay error:', error.message);
            } else if (error instanceof FunctionsFetchError) {
                console.log('Fetch error:', error.message);
            }

            if (invitedFriend) {
                // Add the new user
                void this.modalController.dismiss(invitedFriend, ModalStatus.DISMISS_CONFIRM);
            }
        }
    }
}

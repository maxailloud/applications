import { ChangeDetectionStrategy, Component, inject, viewChild, } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import FriendDataService from '@data-services/friend-data.service';
import UserDataService from '@data-services/user-data.service';
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
import FriendsStore from '@stores/friends.store';
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
    private userDataService = inject(UserDataService);
    private friendsStore = inject(FriendsStore);

    public createFriendForm = FriendFormFactory.createForm();

    public async ionViewDidEnter(): Promise<void> {
        void this.emailInput().setFocus();
    }

    public cancel(): Promise<boolean> {
        this.createFriendForm.reset();
        return this.modalController.dismiss(null, ModalStatus.DISMISS_CANCEL);
    }

    public async invite(): Promise<void> {
        if (this.createFriendForm.valid) {
            const {data: existingFriend} = await this.userDataService.readUser(this.createFriendForm.controls.email.value);

            if (existingFriend) {
                const {data: invitedFriend, error, status: errorStatus} = await this.friendDataService.addFriend(existingFriend.id);

                if (error) {
                    console.error(error, errorStatus);
                } else {
                    this.friendsStore.addFriend(existingFriend);
                }

                void this.modalController.dismiss(invitedFriend, ModalStatus.DISMISS_CONFIRM);
            } else {
                const {data: invitedFriend, error} = await this.friendDataService.inviteFriend(
                    this.createFriendForm.controls.email.value,
                    this.createFriendForm.controls.username.value,
                );

                if (error instanceof FunctionsHttpError) {
                    const errorMessage = await error.context.json();
                    console.log('Function returned an error', errorMessage);
                } else if (error instanceof FunctionsRelayError) {
                    console.log('Relay error:', error.message);
                } else if (error instanceof FunctionsFetchError) {
                    console.log('Fetch error:', error.message);
                }

                if (invitedFriend) {
                    this.friendsStore.addFriend(invitedFriend);
                    void this.modalController.dismiss(invitedFriend, ModalStatus.DISMISS_CONFIRM);
                }
            }
        }
    }
}

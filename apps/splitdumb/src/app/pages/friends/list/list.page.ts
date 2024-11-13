import { ChangeDetectionStrategy, Component, inject, } from '@angular/core';
import { RouterLink } from '@angular/router';
import CreateExpenseComponent from '@components/create-expense/create-expense.component';
import CreateFriendComponent from '@components/create-friend/create-friend.component';
import {
    IonButtons,
    IonContent, IonFab, IonFabButton,
    IonHeader, IonIcon,
    IonItem,
    IonLabel,
    IonList,
    IonMenuButton,
    IonMenuToggle,
    IonTitle,
    IonToolbar, ModalController,
} from '@ionic/angular/standalone';
import FriendsStore from '@stores/friends.store';

@Component({
    selector: 'splitdumb-friends-list',
    standalone: true,
    templateUrl: './list.page.html',
    styleUrls: ['./list.page.scss'],
    imports: [
        IonContent,
        IonHeader,
        IonToolbar,
        IonButtons,
        IonMenuButton,
        IonTitle,
        IonItem,
        IonLabel,
        IonList,
        IonMenuToggle,
        RouterLink,
        IonFab,
        IonFabButton,
        IonIcon,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ListPage {
    public friends = inject(FriendsStore).getFriends();
    private modalController = inject(ModalController);

    public async openModal(): Promise<void> {
        const modal = await this.modalController.create({
            component: CreateFriendComponent,
        });

        void modal.present();
    }
}

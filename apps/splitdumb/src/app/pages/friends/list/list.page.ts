import { ChangeDetectionStrategy, Component, inject, } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
    IonButtons,
    IonContent,
    IonHeader,
    IonItem,
    IonLabel,
    IonList,
    IonMenuButton,
    IonMenuToggle,
    IonTitle,
    IonToolbar,
} from '@ionic/angular/standalone';
import FriendsStore from '@stores/friends.store';

@Component({
    selector: 'splitdumb-user-list',
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
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListPage {
    public friends = inject(FriendsStore).getFriends();
}

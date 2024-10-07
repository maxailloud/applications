import { Component, computed, inject, } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import CreateGroupComponent from '@components/create-group/create-group.component';
import {
    IonButton,
    IonButtons,
    IonCol,
    IonContent,
    IonGrid,
    IonHeader,
    IonIcon,
    IonItem,
    IonLabel,
    IonList,
    IonListHeader,
    IonMenu,
    IonMenuToggle,
    IonRow,
    IonTabBar,
    IonTabButton,
    IonTabs,
    IonTitle,
    IonToggle,
    IonToolbar, ModalController
} from '@ionic/angular/standalone';
import GroupStore from '@stores/group.store';

@Component({
    selector: 'splitdumb-side-menu',
    standalone: true,
    templateUrl: './side-menu.component.html',
    styleUrls: ['./side-menu.component.scss'],
    imports: [
        RouterModule,
        IonContent,
        IonHeader,
        IonIcon,
        IonItem,
        IonLabel,
        IonList,
        IonListHeader,
        IonMenu,
        IonTitle,
        IonToolbar,
        IonButtons,
        IonButton,
        IonGrid,
        IonRow,
        IonCol,
        IonTabs,
        IonTabBar,
        IonTabButton,
        IonToggle,
        FormsModule,
        IonMenuToggle,
        CreateGroupComponent,
    ]
})
export default class SideMenuComponent {
    private groupFromStore = inject(GroupStore).getGroups();
    private modalController = inject(ModalController);

    public groups = computed(() => this.groupFromStore());

    public async openModal(): Promise<void> {
        const modal = await this.modalController.create({
            component: CreateGroupComponent,
        });

        return modal.present();
    }
}

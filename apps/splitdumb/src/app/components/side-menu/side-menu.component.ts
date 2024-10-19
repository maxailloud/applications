import { ChangeDetectionStrategy, Component, computed, inject, viewChild, } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import CreateGroupComponent from '@components/create-group/create-group.component';
import { ModalStatus } from '@enums/modal-status.enum';
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
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class SideMenuComponent {
    public menu = viewChild.required<IonMenu>(IonMenu);

    private groupFromStore = inject(GroupStore).getGroups();
    private modalController = inject(ModalController);

    public groups = computed(() => this.groupFromStore());

    public async openModal(): Promise<void> {
        const modal = await this.modalController.create({
            component: CreateGroupComponent,
        });

        void modal.present();

        const data = await modal.onWillDismiss();

        if (data.role === ModalStatus.DISMISS_CONFIRM) {
            await this.menu().close();
        }
    }
}

import { ChangeDetectionStrategy, Component, inject, } from '@angular/core';
import { RouterLink } from '@angular/router';
import CreateExpenseComponent from '@components/create-expense/create-expense.component';
import CreateContactComponent from '@components/create-contact/create-contact.component';
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
import ContactsStore from '@stores/contacts.store';

@Component({
    selector: 'splitdumb-contacts-list',
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
    public contacts = inject(ContactsStore).getContacts();
    private modalController = inject(ModalController);

    public async openModal(): Promise<void> {
        const modal = await this.modalController.create({
            component: CreateContactComponent,
        });

        void modal.present();
    }
}

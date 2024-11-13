import { Component } from '@angular/core';
import { IonButtons, IonContent, IonHeader, IonMenuButton, IonTitle, IonToolbar, } from '@ionic/angular/standalone';

@Component({
    selector: 'splitdumb-home',
    standalone: true,
    templateUrl: 'home.page.html',
    imports: [
        IonContent,
        IonHeader,
        IonToolbar,
        IonButtons,
        IonMenuButton,
        IonTitle,
    ]
})
export default class AccountPage {
}

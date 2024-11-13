import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import {
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonIcon,
    IonMenuButton,
    IonTitle,
    IonToggle,
    IonToolbar,
} from '@ionic/angular/standalone';
import DarkModeService from '@services/dark-mode.service';
import { SessionService } from '@services/session.service';

@Component({
    selector: 'splitdumb-account',
    standalone: true,
    templateUrl: 'account.page.html',
    styleUrls: ['account.page.scss'],
    imports: [
        CommonModule,
        IonHeader,
        IonToolbar,
        IonTitle,
        IonContent,
        IonToggle,
        FormsModule,
        IonButtons,
        IonMenuButton,
        IonButton,
        IonIcon,
        RouterLink,
    ]
})
export default class AccountPage implements OnInit {
    private darkModeService = inject(DarkModeService);
    private sessionService = inject(SessionService);

    public darkModeToggle = false;

    public ngOnInit(): void {
        this.darkModeToggle = this.darkModeService.isDarkModeOn();
    }

    public toggleDarkMode(ev: CustomEvent): void {
        this.darkModeService.toggleDarkMode(ev.detail.checked);
    }

    public async logOut(): Promise<void> {
        await this.sessionService.signOut();
    }
}

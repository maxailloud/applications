import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
    IonButtons,
    IonContent,
    IonHeader, IonMenuButton, IonTitle, IonToggle, IonToolbar,
} from '@ionic/angular/standalone';
import DarkModeService from '@services/dark-mode.service';

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
    ]
})
export class AccountPage implements OnInit {
    private darkModeService = inject(DarkModeService);
    public paletteToggle = false;

    public ngOnInit(): void {
        this.paletteToggle = this.darkModeService.isDarkModeOn();
    }

    public toggleChange(ev: CustomEvent): void {
        this.darkModeService.toggleDarkPalette(ev.detail.checked);
    }
}

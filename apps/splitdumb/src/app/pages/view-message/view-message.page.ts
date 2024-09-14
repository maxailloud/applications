import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
    IonBackButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonIcon,
    IonItem,
    IonLabel,
    IonNote,
    IonToolbar
} from '@ionic/angular/standalone';
import { DataService, Message } from '@services/data.service';

@Component({
    selector: 'splitdumb-view-message',
    standalone: true,
    templateUrl: './view-message.page.html',
    styleUrls: ['./view-message.page.scss'],
    imports: [
        CommonModule,
        IonItem,
        IonLabel,
        IonNote,
        IonIcon,
        IonButtons,
        IonToolbar,
        IonBackButton,
        IonHeader,
        IonContent,
    ],
})
export class ViewMessagePage implements OnInit {
    private data = inject(DataService);
    private activatedRoute = inject(ActivatedRoute);

    public message!: Message;

    public ngOnInit(): void {
        const id = this.activatedRoute.snapshot.paramMap.get('id');

        if (id) {
            this.message = this.data.getMessageById(parseInt(id, 10));
        }
    }

    public getBackButtonText(): string {
        const win = window as any;
        const mode = win && win.Ionic && win.Ionic.mode;

        return mode === 'ios' ? 'Inbox' : '';
    }
}

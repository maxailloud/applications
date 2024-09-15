import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Group from '@interfaces/group.interface';
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

@Component({
    selector: 'splitdumb-view-group',
    standalone: true,
    templateUrl: './view-group.page.html',
    styleUrls: ['./view-group.page.scss'],
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
export class ViewGroupPage implements OnInit {
    private activatedRoute = inject(ActivatedRoute);

    public group!: Group;

    public ngOnInit(): void {
        this.group = this.activatedRoute.snapshot.data['group'];
    }

    public getBackButtonText(): string {
        const win = window as any;
        const mode = win && win.Ionic && win.Ionic.mode;

        return mode === 'ios' ? 'Inbox' : '';
    }
}

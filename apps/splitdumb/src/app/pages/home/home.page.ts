import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import MessageComponent from '@components/message/message.component';
import { RefresherCustomEvent } from '@ionic/angular';
import { IonContent, IonHeader, IonList, IonRefresher, IonRefresherContent, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { DataService, Message } from '@services/data.service';

@Component({
    selector: 'splitdumb-home',
    standalone: true,
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
    imports: [
        CommonModule,
        IonHeader,
        IonToolbar,
        IonContent,
        IonRefresher,
        IonRefresherContent,
        IonTitle,
        IonList,
        MessageComponent,
    ]
})
export class HomePage {
    private data = inject(DataService);

    public refresh(event: RefresherCustomEvent): void {
        setTimeout(() => {
            event.detail.complete();
        }, 3000);
    }

    public getMessages(): Message[] {
        return this.data.getMessages();
    }
}

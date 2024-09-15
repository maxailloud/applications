import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import GroupComponent from '@components/group/group.component';
import { RefresherCustomEvent } from '@ionic/angular';
import { IonContent, IonHeader, IonList, IonRefresher, IonRefresherContent, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import GroupStore from '@stores/group.store';

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
        GroupComponent,
    ]
})
export class HomePage {
    private groupFromStore = inject(GroupStore).getGroups();

    public groups = computed(() => this.groupFromStore());

    public refresh(event: RefresherCustomEvent): void {
        setTimeout(() => {
            event.detail.complete();
        }, 3000);
    }
}

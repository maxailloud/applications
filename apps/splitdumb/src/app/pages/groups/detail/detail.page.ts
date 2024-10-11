import { Component, inject, input, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import CreateExpenseComponent from '@components/create-expense/create-expense.component';
import { RefresherCustomEvent } from '@ionic/angular';
import {
    IonBackButton,
    IonBadge,
    IonButton,
    IonButtons,
    IonContent,
    IonFab,
    IonFabButton,
    IonHeader,
    IonIcon,
    IonItem,
    IonLabel,
    IonList,
    IonMenuButton,
    IonRefresher,
    IonRefresherContent,
    IonTitle,
    IonToolbar,
    ModalController
} from '@ionic/angular/standalone';
import { SelectGroup } from '@schema/schema';
import ExpenseStore from '@stores/expense.store';

@Component({
    selector: 'splitdumb-detail',
    standalone: true,
    templateUrl: './detail.page.html',
    styleUrls: ['./detail.page.scss'],
    imports: [
        IonItem,
        IonLabel,
        IonIcon,
        IonButtons,
        IonToolbar,
        IonBackButton,
        IonHeader,
        IonContent,
        IonMenuButton,
        IonTitle,
        IonList,
        IonRefresher,
        IonRefresherContent,
        IonFab,
        IonFabButton,
        IonButton,
        RouterLink,
        IonBadge,
    ],
})
export class DetailPage {
    private expenseStore = inject(ExpenseStore);
    private modalController = inject(ModalController);

    public group = input.required<SelectGroup>();

    public expenses = computed(() => {
        return this.expenseStore.getAllExpenses()().get(this.group().id) ?? [];
    });

    public refresh(event: RefresherCustomEvent): void {
        setTimeout(() => {
            event.detail.complete();
        }, 3000);
    }

    public async openModal(): Promise<void> {
        const modal = await this.modalController.create({
            component: CreateExpenseComponent,
            componentProps: {
                group: this.group()
            }
        });

        void modal.present();
    }
}

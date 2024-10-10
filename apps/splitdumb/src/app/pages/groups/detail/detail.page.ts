import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import CreateExpenseComponent from '@components/create-expense/create-expense.component';
import { RefresherCustomEvent } from '@ionic/angular';
import {
    IonBackButton, IonButton,
    IonButtons,
    IonContent, IonFab, IonFabButton,
    IonHeader,
    IonIcon,
    IonItem,
    IonLabel, IonList, IonMenuButton,
    IonNote, IonRefresher, IonRefresherContent, IonTitle,
    IonToolbar, ModalController
} from '@ionic/angular/standalone';
import { SelectExpense, SelectGroup } from '@schema/schema';
import ExpenseStore from '@stores/expense.store';

@Component({
    selector: 'splitdumb-detail',
    standalone: true,
    templateUrl: './detail.page.html',
    styleUrls: ['./detail.page.scss'],
    imports: [
        IonItem,
        IonLabel,
        IonNote,
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
    ],
})
export class DetailPage {
    private activatedRoute = inject(ActivatedRoute);
    private expenseStore = inject(ExpenseStore);
    private modalController = inject(ModalController);

    public group!: SelectGroup;
    public expenses = signal<SelectExpense[]>([]);

    public constructor() {
        this.group = this.activatedRoute.snapshot.data['group'];

        this.expenses.set(this.expenseStore.getExpenses(this.group.id));
    }

    public refresh(event: RefresherCustomEvent): void {
        setTimeout(() => {
            event.detail.complete();
        }, 3000);
    }

    public async openModal(): Promise<void> {
        const modal = await this.modalController.create({
            component: CreateExpenseComponent,
            componentProps: {
                group: this.group
            }

        });

        return modal.present();
    }
}

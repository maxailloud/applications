import { ChangeDetectionStrategy, Component, inject, input, OnInit, viewChild, } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import CurrencySelectorComponent from '@components/currency-selector/currency-selector.component';
import ExpenseDataService from '@data-services/expense-data.service';
import { ModalStatus } from '@enums/modal-status.enum';
import { ExpenseFormFactory } from '@forms/expense-form.factory';
import {
    IonButton,
    IonButtons,
    IonContent,
    IonHeader, IonIcon,
    IonInput,
    IonItem, IonList,
    IonModal, IonSelect, IonSelectOption,
    IonTitle,
    IonToolbar,
    ModalController,
} from '@ionic/angular/standalone';
import { SelectGroup } from '@schema/schema';
import ExpenseStore from '@stores/expense.store';

@Component({
    selector: 'splitdumb-create-expense',
    standalone: true,
    templateUrl: './create-expense.component.html',
    styleUrls: ['./create-expense.component.scss'],
    imports: [
        IonModal,
        IonButton,
        IonButtons,
        IonContent,
        IonHeader,
        IonInput,
        IonItem,
        IonTitle,
        IonToolbar,
        IonIcon,
        ReactiveFormsModule,
        IonList,
        IonSelect,
        IonSelectOption,
        CurrencySelectorComponent,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CreateExpenseComponent implements OnInit {
    public group = input.required<SelectGroup>();
    public nameInput = viewChild.required<IonInput>("descriptionInput");

    private modalController = inject(ModalController);
    private expenseDataService = inject(ExpenseDataService);
    private expenseStore = inject(ExpenseStore);

    public createExpenseForm = ExpenseFormFactory.createForm();

    public ngOnInit(): void {
        this.createExpenseForm = ExpenseFormFactory.createForm({currency: this.group().currency});
    }

    public ionViewDidEnter(): void {
        void this.nameInput().setFocus();
    }

    public get name(): FormControl<string> {
        return this.createExpenseForm.controls.description;
    }

    public cancel(): Promise<boolean> {
        this.createExpenseForm.reset();
        return this.modalController.dismiss(null, ModalStatus.DISMISS_CANCEL);
    }

    public async create(): Promise<void> {
        if (this.createExpenseForm.valid) {
            const {data: expense, error} = await this.expenseDataService.createExpense({
                description: this.createExpenseForm.controls.description.value,
                amount: this.createExpenseForm.controls.amount.value,
                currency: this.createExpenseForm.controls.currency.value,
                creatorId: '5d6c47f3-60b6-4bc7-9511-4693b464ee00',
                groupId: this.group().id,
            });

            if (error) {
                console.error(error);
            }

            if (expense) {
                this.expenseStore.addExpense(expense);
                void this.modalController.dismiss(expense, ModalStatus.DISMISS_CONFIRM);
            }
        }
    }
}

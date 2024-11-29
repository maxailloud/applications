import { ChangeDetectionStrategy, Component, computed, inject, input, OnInit, viewChild, } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import CurrencySelectorComponent from '@components/input-currency-selector/input-currency-selector.component';
import InputPayeeSelectorComponent from '@components/input-payee-selector/input-payee-selector.component';
import ExpenseAmountDataService from '@data-services/expense-amount-data.service';
import ExpenseDataService from '@data-services/expense-data.service';
import ExpenseSplittingType from '@enums/expense-splitting-type.enum';
import ModalStatus from '@enums/modal-status.enum';
import { ExpenseFormFactory } from '@forms/expense-form.factory';
import { ExpenseForm } from '@forms/expense-form.type';
import GroupExtended from '@interfaces/group-extended';
import {
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonIcon,
    IonInput,
    IonItem,
    IonList,
    IonRadio,
    IonRadioGroup,
    IonTitle,
    IonToolbar,
    ModalController,
} from '@ionic/angular/standalone';
import ExpenseStore from '@stores/expense.store';
import UserStore from '@stores/user.store';

@Component({
    selector: 'splitdumb-create-expense',
    standalone: true,
    templateUrl: './create-expense.component.html',
    styleUrls: ['./create-expense.component.scss'],
    imports: [
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
        CurrencySelectorComponent,
        InputPayeeSelectorComponent,
        IonRadioGroup,
        IonRadio,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CreateExpenseComponent implements OnInit {
    public group = input.required<GroupExtended>();
    public nameInput = viewChild.required<IonInput>('descriptionInput');

    private modalController = inject(ModalController);
    private expenseDataService = inject(ExpenseDataService);
    private expenseAmountDataService = inject(ExpenseAmountDataService);
    private expenseStore = inject(ExpenseStore);
    private userStore = inject(UserStore);

    public createExpenseForm!: FormGroup<ExpenseForm>;
    public expenseSplittingType = ExpenseSplittingType;
    public otherMember = computed(() => {
        const groupMembers = this.group().members;
        let otherMember = undefined;

        if (groupMembers.length === 1) {
            if (groupMembers[0].id === this.userStore.getUser().id) {
                otherMember = this.group().creator;
            } else {
                otherMember = groupMembers[0];
            }
        }

        return otherMember;
    });

    public ngOnInit(): void {
        this.createExpenseForm = ExpenseFormFactory
            .createForm(this.userStore.getUser(), {currency: this.group().currency, payeeId: this.userStore.getUser().id});
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
            let payeeId = this.createExpenseForm.controls.payee.value.id;
            const otherMember = this.otherMember();

            if (undefined !== otherMember) {
                switch (this.createExpenseForm.controls.splitType.value) {
                    case ExpenseSplittingType.PAID_SPLIT_EQUALLY:
                    case ExpenseSplittingType.OWED_FULL_AMOUNT:
                        payeeId = this.userStore.getUser().id;
                        break;
                    case ExpenseSplittingType.OTHER_PAID_SPLIT_EQUALLY:
                    case ExpenseSplittingType.OTHER_OWED_FULL_AMOUNT:
                        payeeId = otherMember.id;
                        break;
                }
            }

            const {data: expense, error: expenseError} = await this.expenseDataService.createExpense({
                description: this.createExpenseForm.controls.description.value,
                amount: this.createExpenseForm.controls.amount.value,
                currency: this.createExpenseForm.controls.currency.value,
                creatorId: this.userStore.getUser().id,
                payeeId: payeeId,
                groupId: this.group().id,
            });

            if (expenseError) {
                console.error(expenseError);
            }

            if (expense) {
                const newExpense = this.expenseStore.addExpense(expense);
                const groupMembers = [...this.group().members, this.group().creator];
                const inExpenseUsers = groupMembers.filter(user => user.id !== newExpense.payeeId);
                const amountPerUser = Number(newExpense.amount) / groupMembers.length;

                for (const inExpenseUser of inExpenseUsers) {
                    const {error: expenseAmountError} = await this.expenseAmountDataService.createExpenseAmount({
                        expenseId: newExpense.id,
                        userId: inExpenseUser.id,
                        share: amountPerUser.toString(),
                    });

                    if (expenseAmountError) {
                        console.error(expenseAmountError);
                    }
                }

                void this.modalController.dismiss(newExpense, ModalStatus.DISMISS_CONFIRM);
            }
        }
    }
}

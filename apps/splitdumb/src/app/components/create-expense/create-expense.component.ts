import { Component, inject, Input, } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
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
    ]
})
export default class CreateExpenseComponent {
    @Input({required: true}) public group!: SelectGroup;

    private modalController = inject(ModalController);
    private expenseDataService = inject(ExpenseDataService);

    public createGroupForm = ExpenseFormFactory.createForm();

    public get name(): FormControl<string> {
        return this.createGroupForm.controls.description;
    }

    public cancel(): Promise<boolean> {
        return this.modalController.dismiss(null, ModalStatus.DISMISS_CANCEL);
    }

    public async create(): Promise<void> {
        if (this.createGroupForm.valid) {
            const {data: expense, error} = await this.expenseDataService.createExpense({
                description: this.createGroupForm.controls.description.value,
                amount: '',
                currency: this.group.currency,
                creatorId: '5d6c47f3-60b6-4bc7-9511-4693b464ee00',
                groupId: this.group.id,
            });

            if (error) {
                console.error(error);
            }

            if (expense) {
                // need to add the new expense to the store
                void this.modalController.dismiss(expense, ModalStatus.DISMISS_CONFIRM);
            }
        }
    }
}

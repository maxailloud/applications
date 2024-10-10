import { FormControl, FormGroup, } from '@angular/forms';
import { ExpenseForm } from '@forms/expense-form.type';
import { InsertExpense } from '@schema/schema';

export class ExpenseFormFactory {
    public static createForm(expenseData?: Partial<InsertExpense>): FormGroup<ExpenseForm> {
        return new FormGroup<ExpenseForm>({
            description: new FormControl(expenseData?.description ?? '', {nonNullable: true}),
            amount: new FormControl(expenseData?.amount ?? '', {nonNullable: true}),
            currency: new FormControl(expenseData?.currency ?? '', {nonNullable: true}),
        });
    }
}

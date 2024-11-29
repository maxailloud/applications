import { FormControl, FormGroup, } from '@angular/forms';
import ExpenseSplittingType from '@enums/expense-splitting-type.enum';
import { ExpenseForm } from '@forms/expense-form.type';
import { SelectExpense, SelectUser } from '@schema/schema';

export class ExpenseFormFactory {
    public static createForm(payee: SelectUser, expenseData?: Partial<SelectExpense>): FormGroup<ExpenseForm> {
        return new FormGroup<ExpenseForm>({
            description: new FormControl(expenseData?.description ?? '', {nonNullable: true}),
            amount: new FormControl(expenseData?.amount ?? '', {nonNullable: true}),
            currency: new FormControl(expenseData?.currency ?? '', {nonNullable: true}),
            payee: new FormControl(payee, {nonNullable: true}),
            splitType: new FormControl(ExpenseSplittingType.PAID_SPLIT_EQUALLY, {nonNullable: true}),
        });
    }
}

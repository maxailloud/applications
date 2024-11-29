import { FormControl } from '@angular/forms';
import ExpenseSplittingType from '@enums/expense-splitting-type.enum';
import { SelectUser } from '@schema/schema';

export interface ExpenseForm {
    description: FormControl<string>;
    amount: FormControl<string>;
    currency: FormControl<string>;
    payee: FormControl<SelectUser>;
    splitType: FormControl<ExpenseSplittingType>;
}

import { FormControl } from '@angular/forms';

export interface ExpenseForm {
    description: FormControl<string>;
    amount: FormControl<string>;
    currency: FormControl<string>;
}

import { SelectExpense, SelectUser } from '@schema/schema';

export default interface ExpenseExtended extends SelectExpense {
    payee: SelectUser;
}

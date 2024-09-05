import { SelectExpense, SelectProperty } from '@schema/schema';

export default interface PropertyWithExpenses {
    property: SelectProperty;
    expenses: SelectExpense[];
}

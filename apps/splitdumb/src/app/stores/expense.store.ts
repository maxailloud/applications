import { Injectable, Signal, signal } from '@angular/core';
import ExpenseExtended from '@interfaces/expense-extended';
import { SelectExpense } from '@schema/schema';
import { objectToCamel } from 'ts-case-convert';

@Injectable({
    providedIn: 'root',
})
export default class ExpenseStore {
    private expenses = signal<Map<string, ExpenseExtended[]>>(new Map());

    public getAllExpenses(): Signal<Map<string, ExpenseExtended[]>> {
        return this.expenses;
    }
    public getExpenses(groupId: string): ExpenseExtended[] {
        return this.expenses().get(groupId) ?? [];
    }

    public setExpenses(expenses: Map<string, ExpenseExtended[]>): void {
        this.expenses.set(expenses);
    }

    public addExpense(expense: ExpenseExtended): SelectExpense {
        expense = objectToCamel(expense);

        this.expenses.update(expenses => {
            const groupExpenses = expenses.get(expense.groupId);

            if (groupExpenses) {
                expenses.set(expense.groupId, [expense, ...groupExpenses]);
            } else {
                expenses.set(expense.groupId, [expense]);
            }

            return new Map(expenses);
        });

        return expense;
    }
}

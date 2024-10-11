import { Injectable, Signal, signal } from '@angular/core';
import { SelectExpense } from '@schema/schema';
import { objectToCamel } from 'ts-case-convert';

@Injectable({
    providedIn: 'root',
})
export default class ExpenseStore {
    private expenses = signal<Map<string, SelectExpense[]>>(new Map());

    public getAllExpenses(): Signal<Map<string, SelectExpense[]>> {
        return this.expenses;
    }
    public getExpenses(groupId: string): SelectExpense[] {
        return this.expenses().get(groupId) ?? [];
    }

    public setExpenses(expenses: Map<string, SelectExpense[]>): void {
        this.expenses.set(expenses);
    }

    public addExpense(expense: SelectExpense): void {
        expense = objectToCamel(expense);

        this.expenses.update(expenses => {
            const groupExpenses = expenses.get(expense.groupId);

            if (groupExpenses) {
                expenses.set(expense.groupId, [...groupExpenses, expense]);
            } else {
                expenses.set(expense.groupId, [expense]);
            }

            return new Map(expenses);
        });
    }
}

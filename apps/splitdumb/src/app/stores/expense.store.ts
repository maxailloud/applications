import { Injectable, signal } from '@angular/core';
import { SelectExpense } from '@schema/schema';

@Injectable({
    providedIn: 'root',
})
export default class ExpenseStore {
    private expenses = signal<Map<string, SelectExpense[]>>(new Map());

    public getExpenses(groupId: string): SelectExpense[] {
        return this.expenses().get(groupId) ?? [];
    }

    public setExpenses(expenses: Map<string, SelectExpense[]>): void {
        this.expenses.set(expenses);
    }
}

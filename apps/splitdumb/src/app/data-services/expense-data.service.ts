import { inject, Injectable } from '@angular/core';
import { EXPENSE_TABLE_NAME, InsertExpense, SelectExpense } from '@schema/schema';
import { PostgrestSingleResponse, SupabaseClient } from '@supabase/supabase-js';

@Injectable({
    providedIn: 'root',
})
export default class ExpenseDataService {
    private supabaseClient = inject(SupabaseClient);

    public async createExpense(expense: InsertExpense): Promise<PostgrestSingleResponse<SelectExpense>> {
        return this.supabaseClient.from(EXPENSE_TABLE_NAME).insert({
            description: expense.description,
            amount: expense.amount,
            currency: expense.currency,
            group_id: expense.groupId,
            creator_id: expense.creatorId,
        }).select().single();
    }

    public async readExpenses(groupId: string): Promise<PostgrestSingleResponse<SelectExpense[]>> {
        return this.supabaseClient.from(EXPENSE_TABLE_NAME).select().eq('group_id', groupId);
    }

    public async deleteExpense(groupId: string): Promise<PostgrestSingleResponse<null>> {
        return this.supabaseClient.from(EXPENSE_TABLE_NAME).delete().eq('id', groupId);
    }
}

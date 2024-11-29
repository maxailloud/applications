import { inject, Injectable } from '@angular/core';
import ExpenseExtended from '@interfaces/expense-extended';
import { EXPENSE_TABLE_NAME, InsertExpense } from '@schema/schema';
import { PostgrestSingleResponse, SupabaseClient } from '@supabase/supabase-js';

@Injectable({
    providedIn: 'root',
})
export default class ExpenseDataService {
    private supabaseClient = inject(SupabaseClient);

    public async createExpense(expense: InsertExpense): Promise<PostgrestSingleResponse<ExpenseExtended>> {
        return this.supabaseClient.from(EXPENSE_TABLE_NAME).insert({
            description: expense.description,
            amount: expense.amount,
            currency: expense.currency,
            group_id: expense.groupId,
            creator_id: expense.creatorId,
            payee_id: expense.payeeId,
        }).select('*, payee:user_profiles!payee_id(*)').single();
    }

    public async readExpenses(groupId: string): Promise<PostgrestSingleResponse<ExpenseExtended[]>> {
        return this.supabaseClient
            .from(EXPENSE_TABLE_NAME)
            .select('*, payee:user_profiles!payee_id(*), shares:expenses_shares!expense_id(share, user:user_profiles!user_id(*))')
            .eq('group_id', groupId)
            .order('occurred_at', {ascending: false})
        ;
    }

    public async deleteExpense(groupId: string): Promise<PostgrestSingleResponse<null>> {
        return this.supabaseClient
            .from(EXPENSE_TABLE_NAME)
            .delete()
            .eq('id', groupId)
        ;
    }
}

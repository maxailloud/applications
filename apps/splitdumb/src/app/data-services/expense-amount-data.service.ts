import { inject, Injectable } from '@angular/core';
import { EXPENSE_SHARES_TABLE_NAME, InsertExpenseAmount, SelectExpenseAmount } from '@schema/schema';
import { PostgrestSingleResponse, SupabaseClient } from '@supabase/supabase-js';

@Injectable({
    providedIn: 'root',
})
export default class ExpenseAmountDataService {
    private supabaseClient = inject(SupabaseClient);

    public async createExpenseAmount(expenseAmount: InsertExpenseAmount): Promise<PostgrestSingleResponse<SelectExpenseAmount>> {
        return this.supabaseClient.from(EXPENSE_SHARES_TABLE_NAME).insert({
            expense_id: expenseAmount.expenseId,
            user_id: expenseAmount.userId,
            share: expenseAmount.share,
        }).select('*').single();
    }
}

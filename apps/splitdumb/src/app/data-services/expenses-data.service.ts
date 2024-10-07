import { inject, Injectable } from '@angular/core';
import { EXPENSE_TABLE_NAME, SelectExpense } from '@schema/schema';
import { PostgrestSingleResponse, SupabaseClient } from '@supabase/supabase-js';

@Injectable({
    providedIn: 'root',
})
export default class ExpensesDataService {
    private supabaseClient = inject(SupabaseClient);

    public async createExpense(name: string, amount: number, groupId: string): Promise<PostgrestSingleResponse<SelectExpense>> {
        return this.supabaseClient.from(EXPENSE_TABLE_NAME).insert({name, amount, group_id: groupId}).select().single();
    }

    public async readExpenses(groupId: string): Promise<PostgrestSingleResponse<SelectExpense[]>> {
        return this.supabaseClient.from(EXPENSE_TABLE_NAME).select().eq('group_id', groupId);
    }

    public async deleteExpense(groupId: string): Promise<PostgrestSingleResponse<null>> {
        return this.supabaseClient.from(EXPENSE_TABLE_NAME).delete().eq('id', groupId);
    }
}

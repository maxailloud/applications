import { inject, Injectable } from '@angular/core';
import { EXPENSE_TABLE_NAME, SelectExpense } from '@schema/schema';
import { PostgrestSingleResponse, SupabaseClient } from '@supabase/supabase-js';

@Injectable({
    providedIn: 'root',
})
export class ExpensesDataService {
    private supabaseClient = inject(SupabaseClient);

    public async createExpense(name: string, amount: number, propertyId: string): Promise<PostgrestSingleResponse<SelectExpense>> {
        return this.supabaseClient.from(EXPENSE_TABLE_NAME).insert({name, amount, property_id: propertyId}).select().single();
    }

    public async readExpenses(propertyId: string): Promise<PostgrestSingleResponse<SelectExpense[]>> {
        return this.supabaseClient.from(EXPENSE_TABLE_NAME).select().eq('property_id', propertyId);
    }

    public async deleteExpense(propertyId: string): Promise<PostgrestSingleResponse<null>> {
        return this.supabaseClient.from(EXPENSE_TABLE_NAME).delete().eq('id', propertyId);
    }
}

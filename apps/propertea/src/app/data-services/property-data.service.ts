import { inject, Injectable } from '@angular/core';
import { PROPERTY_TABLE_NAME, SelectProperty } from '@schema/schema';
import { PostgrestSingleResponse, SupabaseClient } from '@supabase/supabase-js';

@Injectable({
    providedIn: 'root',
})
export class PropertyDataService {
    private supabaseClient = inject(SupabaseClient);

    public async createProperty(name: string, address: string, userId: string): Promise<PostgrestSingleResponse<SelectProperty[]>> {
        return this.supabaseClient.from(PROPERTY_TABLE_NAME).insert({name, address, user_id: userId}).select();
    }

    public async readProperty(propertyId: string): Promise<PostgrestSingleResponse<SelectProperty>> {
        return this.supabaseClient.from(PROPERTY_TABLE_NAME).select().eq('id', propertyId).single();
    }

    public async readProperties(): Promise<PostgrestSingleResponse<SelectProperty[]>> {
        return this.supabaseClient.from(PROPERTY_TABLE_NAME).select();
    }

    public async deleteProperties(propertyId: string): Promise<PostgrestSingleResponse<null>> {
        return this.supabaseClient.from(PROPERTY_TABLE_NAME).delete().eq('id', propertyId);
    }
}

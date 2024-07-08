import { inject, Injectable } from '@angular/core';
import { InsertProperty, PROPERTY_TABLE_NAME, SelectProperty } from '@schema/schema';
import { PostgrestSingleResponse, SupabaseClient } from '@supabase/supabase-js';

@Injectable({
    providedIn: 'root',
})
export class PropertyDataService {
    private supabaseClient = inject(SupabaseClient);

    public async createProperty(property: InsertProperty):
    Promise<PostgrestSingleResponse<SelectProperty>> {
        return this.supabaseClient.from(PROPERTY_TABLE_NAME).insert({
            name: property.name,
            address: property.address,
            rent: property.rent,
            mortgage: property.mortgage,
            user_id: property.userId,
        }).select().single();
    }

    public async updateProperty(property: SelectProperty): Promise<PostgrestSingleResponse<null>> {
        return this.supabaseClient.from(PROPERTY_TABLE_NAME).update({
            name: property.name,
            address: property.address,
            rent: property.rent,
            mortgage: property.mortgage,
            user_id: property.userId,
            created_at: property.createdAt,
            updated_at: property.updatedAt,
        }).eq('id', property.id);
    }

    public async readProperty(propertyId: string): Promise<PostgrestSingleResponse<SelectProperty>> {
        return this.supabaseClient.from(PROPERTY_TABLE_NAME).select().eq('id', propertyId).single();
    }

    public async readProperties(): Promise<PostgrestSingleResponse<SelectProperty[]>> {
        return this.supabaseClient.from(PROPERTY_TABLE_NAME).select();
    }

    public async deleteProperty(propertyId: string): Promise<PostgrestSingleResponse<null>> {
        return this.supabaseClient.from(PROPERTY_TABLE_NAME).delete().eq('id', propertyId);
    }
}

import { inject, Injectable } from '@angular/core';
import { PROPERTY_TABLE_NAME } from '@schema/schema';
import { SupabaseClient } from '@supabase/supabase-js';

@Injectable({
    providedIn: 'root',
})
export class PropertyDataService {
    private supabaseClient = inject(SupabaseClient);

    async createProperty(name: string, address: string, userId: string) {
        return this.supabaseClient.from(PROPERTY_TABLE_NAME).insert({name, address, userId});
    }
}

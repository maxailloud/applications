import { inject, Injectable } from '@angular/core';
import { SupabaseClient } from '@supabase/supabase-js';

@Injectable({
    providedIn: 'root',
})
export class PropertyAccessor {
    private supabaseClient = inject(SupabaseClient);
}

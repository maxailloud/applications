import { inject, Injectable } from '@angular/core';
import { SupabaseClient } from '@supabase/supabase-js';

@Injectable({
    providedIn: 'root',
})
export default class FriendDataService {
    private supabaseClient = inject(SupabaseClient);
}

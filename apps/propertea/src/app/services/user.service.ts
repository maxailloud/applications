import { inject, Injectable } from '@angular/core';
import { SupabaseClient, User } from '@supabase/supabase-js';
import { Property } from '@models/property';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    private supabaseClient = inject(SupabaseClient);

    public profile (user: User) {
        return this.supabaseClient
            .from('profiles')
            .select(`username, website, avatar_url`)
            .eq('id', user.id)
            .single();
    }

    public updateProfile (profile: Property) {
        const update = {
            ...profile,
            updated_at: new Date(),
        };

        return this.supabaseClient.from('profiles').upsert(update);
    }
}

import { inject, Injectable } from '@angular/core';
import UserWithRelations from '@interfaces/user-with-relations';
import { SelectUser, USER_PROFILE_TABLE_NAME } from '@schema/schema';
import SessionStore from '@stores/session.store';
import { PostgrestSingleResponse, SupabaseClient } from '@supabase/supabase-js';

@Injectable({
    providedIn: 'root',
})
export default class UserDataService {
    private supabaseClient = inject(SupabaseClient);
    private sessionStore = inject(SessionStore);

    public async readConnectedUser(): Promise<PostgrestSingleResponse<UserWithRelations>> {
        return this.supabaseClient
            .from(USER_PROFILE_TABLE_NAME)
            .select('*, groups!users_groups(*), friends:user_friends!user_id(...friend_id(*))')
            .eq('id', this.sessionStore.getSession().user.id)
            .single()
        ;
    }

    public async readUser(email: string): Promise<PostgrestSingleResponse<SelectUser|null>> {
        return this.supabaseClient
            .from(USER_PROFILE_TABLE_NAME)
            .select('id, email, username')
            .eq('email', email)
            .maybeSingle()
        ;
    }
}

import { inject, Injectable } from '@angular/core';
import UserWithRelations from '@interfaces/user-with-relations';
import { USER_TABLE_NAME } from '@schema/schema';
import { PostgrestSingleResponse, SupabaseClient } from '@supabase/supabase-js';

@Injectable({
    providedIn: 'root',
})
export default class UserDataService {
    private supabaseClient = inject(SupabaseClient);

    public async readUser(): Promise<PostgrestSingleResponse<UserWithRelations>> {
        return this.supabaseClient
            .from(USER_TABLE_NAME)
            .select("id, firstname, lastname, groups!users_groups(*), friends:user_friends!user_id(...friend_id(*))")
            .eq('id', 'b3c2a176-a050-48e9-bca3-1823d305f5d6')
            .single()
        ;
    }
}

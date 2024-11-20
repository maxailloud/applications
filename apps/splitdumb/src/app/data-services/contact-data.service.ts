import { inject, Injectable } from '@angular/core';
import { SelectUser, USER_CONTACT_TABLE_NAME } from '@schema/schema';
import UserStore from '@stores/user.store';
import { FunctionsResponse } from '@supabase/functions-js/src/types';
import { PostgrestSingleResponse, SupabaseClient } from '@supabase/supabase-js';

@Injectable({
    providedIn: 'root',
})
export default class ContactDataService {
    private supabaseClient = inject(SupabaseClient);
    private userStore = inject(UserStore);

    public async addContact(userId: string): Promise<PostgrestSingleResponse<null>> {
        return this.supabaseClient
            .from(USER_CONTACT_TABLE_NAME)
            .insert({
                user_id: this.userStore.getUser().id,
                contact_id: userId,
            })
        ;
    }

    public async inviteContact(email: string, username: string): Promise<FunctionsResponse<SelectUser>> {
        return await this.supabaseClient.functions.invoke('invite-user', {
            body: {email, username},
        });
    }
}

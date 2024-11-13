import { inject, Injectable } from '@angular/core';
import { SelectUser, USER_FRIEND_TABLE_NAME } from '@schema/schema';
import UserStore from '@stores/user.store';
import { FunctionsResponse } from '@supabase/functions-js/src/types';
import { PostgrestSingleResponse, SupabaseClient } from '@supabase/supabase-js';

@Injectable({
    providedIn: 'root',
})
export default class FriendDataService {
    private supabaseClient = inject(SupabaseClient);
    private userStore = inject(UserStore);

    public async addFriend(userId: string): Promise<PostgrestSingleResponse<null>> {
        return this.supabaseClient
            .from(USER_FRIEND_TABLE_NAME)
            .insert({
                user_id: this.userStore.getUser().id,
                friend_id: userId,
            })
        ;
    }

    public async inviteFriend(email: string, username: string): Promise<FunctionsResponse<SelectUser>> {
        return await this.supabaseClient.functions.invoke('invite-user', {
            body: {email, username},
        });
    }
}

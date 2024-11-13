import { inject, Injectable } from '@angular/core';
import { FunctionsResponse } from '@supabase/functions-js/src/types';
import { SupabaseClient } from '@supabase/supabase-js';

@Injectable({
    providedIn: 'root',
})
export default class FriendDataService {
    private supabaseClient = inject(SupabaseClient);

    public async inviteFriend(email: string, username: string): Promise<FunctionsResponse<string>> {
        return await this.supabaseClient.functions.invoke('invite-user', {
            body: {email, username},
        });
    }
}

import { inject, Injectable } from '@angular/core';
import { GROUP_TABLE_NAME, InsertGroup, SelectGroup } from '@schema/schema';
import { PostgrestSingleResponse, SupabaseClient } from '@supabase/supabase-js';

@Injectable({
    providedIn: 'root',
})
export default class GroupDataService {
    private supabaseClient = inject(SupabaseClient);

    public async createGroup(group: InsertGroup):
    Promise<PostgrestSingleResponse<SelectGroup>> {
        return this.supabaseClient.from(GROUP_TABLE_NAME).insert({
            name: group.name,
            creator_id: group.creatorId,
            icon: group.icon,
            currency: group.currency,
        }).select().single();
    }

    public async deleteGroup(groupId: string): Promise<PostgrestSingleResponse<null>> {
        return this.supabaseClient.from(GROUP_TABLE_NAME).delete().eq('id', groupId);
    }
}

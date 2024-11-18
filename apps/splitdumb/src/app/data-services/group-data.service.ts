import { inject, Injectable } from '@angular/core';
import { GROUP_TABLE_NAME, InsertGroup, SelectGroup } from '@schema/schema';
import UserStore from '@stores/user.store';
import { PostgrestSingleResponse, SupabaseClient } from '@supabase/supabase-js';

@Injectable({
    providedIn: 'root',
})
export default class GroupDataService {
    private supabaseClient = inject(SupabaseClient);
    private userStore = inject(UserStore);

    public async createGroup(group: InsertGroup):
    Promise<PostgrestSingleResponse<SelectGroup>> {
        return this.supabaseClient.from(GROUP_TABLE_NAME).insert({
            name: group.name,
            creator_id: group.creatorId,
            icon: group.icon,
            currency: group.currency,
        }).select().single();
    }

    public async updateGroup(groupId: string, groupData: Partial<SelectGroup>):
    Promise<PostgrestSingleResponse<null>> {
        return this.supabaseClient
            .from(GROUP_TABLE_NAME)
            .update(groupData)
            .eq('id', groupId)
        ;
    }

    public async readCreatedUserGroups(): Promise<PostgrestSingleResponse<SelectGroup[]>> {
        return this.supabaseClient
            .from(GROUP_TABLE_NAME)
            .select('*, creator:user_profiles!creator_id(*), users:users_groups!inner(...user_id(*))')
            .eq('creator_id', this.userStore.getUser().id)
        ;
    }

    public async readUserGroups(): Promise<PostgrestSingleResponse<SelectGroup[]>> {
        return this.supabaseClient
            .from(GROUP_TABLE_NAME)
            .select('*, creator:user_profiles!creator_id(*), users:users_groups!inner(...user_id(*))')
            .eq('users_groups.user_id', this.userStore.getUser().id)
        ;
    }

    public async deleteGroup(groupId: string): Promise<PostgrestSingleResponse<null>> {
        return this.supabaseClient.from(GROUP_TABLE_NAME).delete().eq('id', groupId);
    }
}

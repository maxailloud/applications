import { inject, Injectable } from '@angular/core';
import GroupExtended from '@interfaces/group-extended';
import { GROUP_TABLE_NAME, InsertGroup, USER_GROUP_TABLE_NAME } from '@schema/schema';
import UserStore from '@stores/user.store';
import { PostgrestSingleResponse, SupabaseClient } from '@supabase/supabase-js';

@Injectable({
    providedIn: 'root',
})
export default class GroupDataService {
    private supabaseClient = inject(SupabaseClient);
    private userStore = inject(UserStore);

    public async createGroup(group: InsertGroup):
    Promise<PostgrestSingleResponse<GroupExtended>> {
        return this.supabaseClient.from(GROUP_TABLE_NAME).insert({
            name: group.name,
            creator_id: group.creatorId,
            icon: group.icon,
            currency: group.currency,
        }).select('*, creator:user_profiles!creator_id(*), members:users_groups(...user_id(*))').single();
    }

    public async updateGroup(groupId: string, groupData: Partial<GroupExtended>):
    Promise<PostgrestSingleResponse<null>> {
        return this.supabaseClient
            .from(GROUP_TABLE_NAME)
            .update(groupData)
            .eq('id', groupId)
        ;
    }

    public async addGroupMembers(groupId: string, memberIds: string[]):
    Promise<PostgrestSingleResponse<null>> {
        const insertData = [];

        for (const memberId of memberIds) {
            insertData.push({group_id: groupId, user_id: memberId});
        }

        return this.supabaseClient
            .from(USER_GROUP_TABLE_NAME)
            .insert(insertData)
        ;
    }

    public async removeGroupMembers(groupId: string, memberIds: string[]):
    Promise<PostgrestSingleResponse<null>> {
        return this.supabaseClient
            .from(USER_GROUP_TABLE_NAME)
            .delete()
            .eq('group_id', groupId)
            .in('user_id', memberIds)
        ;
    }

    public async readCreatedUserGroups(): Promise<PostgrestSingleResponse<GroupExtended[]>> {
        return this.supabaseClient
            .from(GROUP_TABLE_NAME)
            .select('*, creator:user_profiles!creator_id(*), members:users_groups(...user_id(*))')
            .eq('creator_id', this.userStore.getUser().id)
        ;
    }

    public async readUserGroups(): Promise<PostgrestSingleResponse<GroupExtended[]>> {
        return this.supabaseClient
            .from(GROUP_TABLE_NAME)
            .select('*, creator:user_profiles!creator_id(*), members:users_groups!inner(...user_id(*))')
            .eq('users_groups.user_id', this.userStore.getUser().id)
        ;
    }

    public async deleteGroup(groupId: string): Promise<PostgrestSingleResponse<null>> {
        return this.supabaseClient.from(GROUP_TABLE_NAME).delete().eq('id', groupId);
    }
}

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

    public async readGroups(): Promise<PostgrestSingleResponse<SelectGroup[]>> {
        return this.supabaseClient.from(GROUP_TABLE_NAME).select();
    }

    public async readGroups2(): Promise<SelectGroup[]> {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve([
                    {
                        id: 'default-group',
                        name: 'Default group',
                        icon: 'folder-open',
                        currency: 'USD',
                        creatorId: 'moi',
                        createdAt: new Date(),
                        updatedAt: new Date(),
                    },
                    {
                        id: 'home',
                        name: 'Home',
                        icon: 'home',
                        currency: 'USD',
                        creatorId: 'moi',
                        createdAt: new Date(),
                        updatedAt: new Date(),
                    },
                    {
                        id: 'italy-2024',
                        name: 'Italy 2024',
                        icon: 'paper-plane',
                        currency: 'USD',
                        creatorId: 'moi',
                        createdAt: new Date(),
                        updatedAt: new Date(),
                    },
                    {
                        id: 'italy-hadia-2024',
                        name: 'Italy Hadia 2024',
                        icon: 'paper-plane',
                        currency: 'USD',
                        creatorId: 'moi',
                        createdAt: new Date(),
                        updatedAt: new Date(),
                    },
                    {
                        id: 'italy-kat-2024',
                        name: 'Italy Kat 2024',
                        icon: 'paper-plane',
                        currency: 'USD',
                        creatorId: 'moi',
                        createdAt: new Date(),
                        updatedAt: new Date(),
                    },
                    {
                        id: 'japan-2024',
                        name: 'Japan 2024',
                        icon: 'paper-plane',
                        currency: 'USD',
                        creatorId: 'moi',
                        createdAt: new Date(),
                        updatedAt: new Date(),
                    },
                    {
                        id: 'japan2-2024',
                        name: 'Japan 2024',
                        icon: 'paper-plane',
                        currency: 'USD',
                        creatorId: 'moi',
                        createdAt: new Date(),
                        updatedAt: new Date(),
                    },
                    {
                        id: 'japan3-2024',
                        name: 'Japan 2024',
                        icon: 'paper-plane',
                        currency: 'USD',
                        creatorId: 'moi',
                        createdAt: new Date(),
                        updatedAt: new Date(),
                    },
                    {
                        id: 'japan4-2024',
                        name: 'Japan 2024',
                        icon: 'paper-plane',
                        currency: 'USD',
                        creatorId: 'moi',
                        createdAt: new Date(),
                        updatedAt: new Date(),
                    },
                    {
                        id: 'japan5-2024',
                        name: 'Japan 2024',
                        icon: 'paper-plane',
                        currency: 'USD',
                        creatorId: 'moi',
                        createdAt: new Date(),
                        updatedAt: new Date(),
                    },
                    {
                        id: 'japan6-2024',
                        name: 'Japan 2024',
                        icon: 'paper-plane',
                        currency: 'USD',
                        creatorId: 'moi',
                        createdAt: new Date(),
                        updatedAt: new Date(),
                    },
                    {
                        id: 'japan7-2024',
                        name: 'Japan 2024',
                        icon: 'paper-plane',
                        currency: 'USD',
                        creatorId: 'moi',
                        createdAt: new Date(),
                        updatedAt: new Date(),
                    },
                    {
                        id: 'japan8-2024',
                        name: 'Japan 2024',
                        icon: 'paper-plane',
                        currency: 'USD',
                        creatorId: 'moi',
                        createdAt: new Date(),
                        updatedAt: new Date(),
                    },
                    {
                        id: 'japan9-2024',
                        name: 'Japan 2024',
                        icon: 'paper-plane',
                        currency: 'USD',
                        creatorId: 'moi',
                        createdAt: new Date(),
                        updatedAt: new Date(),
                    },
                    {
                        id: 'japan10-2024',
                        name: 'Japan 2024',
                        icon: 'paper-plane',
                        currency: 'USD',
                        creatorId: 'moi',
                        createdAt: new Date(),
                        updatedAt: new Date(),
                    },
                ]);
            }, 3000)
        });
    }
}

import { Injectable, Signal, signal } from '@angular/core';
import GroupExtended from '@interfaces/group-extended';
import { objectToCamel } from 'ts-case-convert';

@Injectable({
    providedIn: 'root',
})
export default class GroupStore {
    private groups = signal<GroupExtended[]>([]);

    public getGroups(): Signal<GroupExtended[]> {
        return this.groups;
    }

    public getGroup(groupId: string): GroupExtended | undefined {
        return this.groups().find(group => group.id === groupId);
    }

    public addGroup(group: GroupExtended): void {
        this.groups.update(groups => [...groups, objectToCamel(group)]);
    }

    public setGroups(groups: GroupExtended[]): void {
        this.groups.set(groups);
    }
}

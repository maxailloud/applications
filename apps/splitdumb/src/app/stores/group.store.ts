import { Injectable, Signal, signal } from '@angular/core';
import { SelectGroup } from '@schema/schema';

@Injectable({
    providedIn: 'root',
})
export default class GroupStore {
    private groups = signal<Map<string, SelectGroup>>(new Map());

    public getGroups(): Signal<Map<string, SelectGroup>> {
        return this.groups;
    }

    public getGroup(groupId: string): SelectGroup | undefined {
        return this.groups().get(groupId);
    }

    public addGroup(group: SelectGroup): void {
        const groups = this.groups();
        groups.set(group.id, group);

        this.groups.set(groups);
    }

    public setGroups(groups: Map<string, SelectGroup>): void {
        this.groups.set(groups);
    }
}

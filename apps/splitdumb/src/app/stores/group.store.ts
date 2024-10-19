import { Injectable, Signal, signal } from '@angular/core';
import { SelectGroup } from '@schema/schema';
import { objectToCamel } from 'ts-case-convert';

@Injectable({
    providedIn: 'root',
})
export default class GroupStore {
    private groups = signal<SelectGroup[]>([]);

    public getGroups(): Signal<SelectGroup[]> {
        return this.groups;
    }

    public getGroup(groupId: string): SelectGroup | undefined {
        return this.groups().find(group => group.id === groupId);
    }

    public addGroup(group: SelectGroup): void {
        this.groups.update(groups => [...groups, objectToCamel(group)]);
    }

    public setGroups(groups: SelectGroup[]): void {
        this.groups.set(groups);
    }
}

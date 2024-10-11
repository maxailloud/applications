import { Injectable, Signal, signal } from '@angular/core';
import { SelectGroup } from '@schema/schema';
import { objectToCamel } from 'ts-case-convert';

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
        this.groups.update(groups => groups.set(group.id, objectToCamel(group)));
    }

    public setGroups(groups: Map<string, SelectGroup>): void {
        this.groups.set(groups);
    }
}

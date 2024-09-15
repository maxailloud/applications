import { Injectable, Signal, signal } from '@angular/core';
import Group from '@interfaces/group.interface';

@Injectable({
    providedIn: 'root',
})
export default class GroupStore {
    private groups = signal<Map<string, Group>>(new Map());

    public getGroups(): Signal<Map<string, Group>> {
        return this.groups;
    }

    public getGroup(groupId: string): Group | undefined {
        return this.groups().get(groupId);
    }

    public setGroups(groups: Map<string, Group>): void {
        this.groups.set(groups);
    }
}

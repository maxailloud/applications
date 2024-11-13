import { Injectable, Signal, signal } from '@angular/core';
import { SelectUser } from '@schema/schema';
import { objectToCamel } from 'ts-case-convert';

@Injectable({
    providedIn: 'root',
})
export default class FriendsStore {
    private friends = signal<SelectUser[]>([]);

    public getFriends(): Signal<SelectUser[]> {
        return this.friends;
    }

    public getFriend(userId: string): SelectUser | undefined {
        return this.friends().find(friend => friend.id = userId) ?? undefined;
    }

    public addFriend(friend: SelectUser): void {
        this.friends.update(friends => [...friends, objectToCamel(friend)]);
    }

    public setFriends(users: SelectUser[]): void {
        this.friends.set(users);
    }
}

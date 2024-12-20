import { Injectable, signal } from '@angular/core';
import { SelectUser } from '@schema/schema';

@Injectable({
    providedIn: 'root',
})
export default class UserStore {
    private user = signal<SelectUser>({id: '', email: '', username: ''});

    public getUser(): SelectUser {
        return this.user();
    }

    public setUser(user: SelectUser): void {
        this.user.set(user);
    }
}

import { Injectable, Signal, signal } from '@angular/core';
import { SelectUser } from '@schema/schema';
import { objectToCamel } from 'ts-case-convert';

@Injectable({
    providedIn: 'root',
})
export default class ContactsStore {
    private contacts = signal<SelectUser[]>([]);

    public getContacts(): Signal<SelectUser[]> {
        return this.contacts;
    }

    public getContact(userId: string): SelectUser | undefined {
        return this.contacts().find(contact => contact.id = userId) ?? undefined;
    }

    public addContact(contact: SelectUser): void {
        this.contacts.update(contacts => [...contacts, objectToCamel(contact)]);
    }

    public setContacts(users: SelectUser[]): void {
        this.contacts.set(users);
    }
}

import { Injectable, Signal, signal } from '@angular/core';
import PropertyWithExpenses from '@interfaces/property-with-expenses.interface';

@Injectable({
    providedIn: 'root',
})
export default class DataStore {
    private propertiesWithExpenses = signal<Map<string, PropertyWithExpenses>>(new Map());

    public getData(): Signal<Map<string, PropertyWithExpenses>> {
        return this.propertiesWithExpenses;
    }

    public setData(propertyWithExpenses: Map<string, PropertyWithExpenses>): void {
        this.propertiesWithExpenses.set(propertyWithExpenses);
    }
}

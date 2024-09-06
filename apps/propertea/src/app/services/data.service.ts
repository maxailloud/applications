import { inject, Injectable } from '@angular/core';
import ExpensesDataService from '@data-services/expenses-data.service';
import PropertyDataService from '@data-services/property-data.service';
import DataStore from '@stores/data.store';

@Injectable({
    providedIn: 'root',
})
export default class DataService {
    private propertyDataService = inject(PropertyDataService);
    private expensesDataService = inject(ExpensesDataService);
    private dataStore = inject(DataStore);

    public async initialiseData(): Promise<void> {
        const propertiesWithExpenses = new Map();

        try {
            const {data: properties, error, status} = await this.propertyDataService.readProperties();

            if (error) {
                console.error(error, status);
            }

            if (properties) {
                await Promise.all(properties.map(async (property) => {
                    try {
                        const {data: expenses, error, status} = await this.expensesDataService.readExpenses(property.id);

                        if (error) {
                            console.error(error, status);
                        }

                        if (expenses) {
                            propertiesWithExpenses.set(property.id, {property, expenses})
                        } else {
                            propertiesWithExpenses.set(property.id, {property, expenses: []})
                        }
                    } catch (error) {
                        if (error instanceof Error) {
                            console.error(error);
                        }
                    }
                }));
            }
        } catch (error) {
            if (error instanceof Error) {
                console.error(error);
            }
        }

        this.dataStore.setData(propertiesWithExpenses);
    }
}

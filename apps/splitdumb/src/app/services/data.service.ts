import { inject, Injectable } from '@angular/core';
import ExpenseDataService from '@data-services/expense-data.service';
import GroupDataService from '@data-services/group-data.service';
import ExpenseStore from '@stores/expense.store';
import GroupStore from '@stores/group.store';

@Injectable({
    providedIn: 'root',
})
export default class DataService {
    private groupDataService = inject(GroupDataService);
    private groupStore = inject(GroupStore);
    private expenseStore = inject(ExpenseStore);
    private expensesDataService = inject(ExpenseDataService);

    public async initialiseData(): Promise<void> {
        const groups = new Map();
        const expenses = new Map();

        try {
            const {data: readGroups, error, status} = await this.groupDataService.readGroups();

            if (error) {
                console.error(error, status);
            }

            if (readGroups) {
                await Promise.all(readGroups.map(async (group) => {
                    try {
                        groups.set(group.id, group);

                        const {data: readExpenses, error, status} = await this.expensesDataService.readExpenses(group.id);

                        if (error) {
                            console.error(error, status);
                        }

                        if (readExpenses) {
                            expenses.set(group.id, readExpenses);
                        } else {
                            expenses.set(group.id, []);
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

        this.groupStore.setGroups(groups);
        this.expenseStore.setExpenses(expenses);
    }
}

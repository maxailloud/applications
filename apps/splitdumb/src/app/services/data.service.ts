import { inject, Injectable } from '@angular/core';
import ExpenseDataService from '@data-services/expense-data.service';
import GroupDataService from '@data-services/group-data.service';
import UserDataService from '@data-services/user-data.service';
import ExpenseStore from '@stores/expense.store';
import ContactsStore from '@stores/contacts.store';
import GroupStore from '@stores/group.store';
import UserStore from '@stores/user.store';

@Injectable({
    providedIn: 'root',
})
export default class DataService {
    private userStore = inject(UserStore);
    private groupStore = inject(GroupStore);
    private expenseStore = inject(ExpenseStore);
    private contactsStore = inject(ContactsStore);
    private userDataService = inject(UserDataService);
    private groupDataService = inject(GroupDataService);
    private expensesDataService = inject(ExpenseDataService);

    public async initialiseData(): Promise<void> {
        try {
            const expenses = new Map();

            const {data: readUser, error: errorUser, status: statusUser} = await this.userDataService.readConnectedUser();

            if (errorUser) {
                console.error(errorUser, statusUser);
            }

            if (readUser) {
                this.userStore.setUser({
                    id: readUser.id,
                    email: readUser.email,
                    username: readUser.username,
                });

                const {
                    data: readGroups,
                    error: errorGroups,
                    status: statusGroups
                } = await this.groupDataService.readUserGroups();

                if (errorGroups) {
                    console.error(errorGroups, statusGroups);
                }

                const {
                    data: readCreatedGroups,
                    error: errorCreatedGroups,
                    status: statusCreatedGroups
                } = await this.groupDataService.readCreatedUserGroups();

                if (errorCreatedGroups) {
                    console.error(errorCreatedGroups, statusCreatedGroups);
                }

                let userGroups = readGroups ?? [];

                if (readGroups) {
                    userGroups = userGroups.concat(readCreatedGroups ?? []);
                }

                this.contactsStore.setContacts(readUser.contacts);
                this.groupStore.setGroups(userGroups);

                await Promise.all(userGroups.map(async (group) => {
                    try {
                        const {
                            data: readExpenses,
                            error: errorExpenses,
                            status: StatusExpenses
                        } = await this.expensesDataService.readExpenses(group.id);

                        if (errorExpenses) {
                            console.error(errorExpenses, StatusExpenses);
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

                this.expenseStore.setExpenses(expenses);
            } else {
                console.error('User not found');
            }
        } catch (error) {
            if (error instanceof Error) {
                console.error(error);
            }
        }
    }
}

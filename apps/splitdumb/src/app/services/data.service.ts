import { inject, Injectable } from '@angular/core';
import ExpenseDataService from '@data-services/expense-data.service';
import UserDataService from '@data-services/user-data.service';
import ExpenseStore from '@stores/expense.store';
import FriendsStore from '@stores/friends.store';
import GroupStore from '@stores/group.store';
import UserStore from '@stores/user.store';

@Injectable({
    providedIn: 'root',
})
export default class DataService {
    private userStore = inject(UserStore);
    private groupStore = inject(GroupStore);
    private expenseStore = inject(ExpenseStore);
    private friendsStore = inject(FriendsStore);
    private userDataService = inject(UserDataService);
    private expensesDataService = inject(ExpenseDataService);

    public async initialiseData(): Promise<void> {
        try {
            const expenses = new Map();

            const {data: readUser, error: errorUser, status: statusUser} = await this.userDataService.readUser();

            if (errorUser) {
                console.error(errorUser, statusUser);
            }

            if (readUser) {
                this.userStore.setUser(readUser.user);
                this.friendsStore.setFriends(readUser.friends);
                this.groupStore.setGroups(readUser.groups);

                await Promise.all(readUser.groups.map(async (group) => {
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
import { inject, Injectable } from '@angular/core';
import GroupDataService from '@data-services/group-data.service';
import GroupStore from '@stores/group.store';

@Injectable({
    providedIn: 'root',
})
export default class DataService {
    private groupDataService = inject(GroupDataService);
    private groupStore = inject(GroupStore);

    public async initialiseData(): Promise<void> {
        const groups = new Map();

        try {
            const readGroups = await this.groupDataService.readGroups();

            if (readGroups) {
                readGroups.forEach((group) => {
                    groups.set(group.id, group);
                });
            }
        } catch (error) {
            if (error instanceof Error) {
                console.error(error);
            }
        }

        this.groupStore.setGroups(groups);
    }
}

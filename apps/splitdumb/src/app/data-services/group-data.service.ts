import { Injectable } from '@angular/core';
import Group from '@interfaces/group.interface';

@Injectable({
    providedIn: 'root',
})
export default class GroupDataService {
    public async readGroups(): Promise<Group[]> {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve([
                    {
                        id: 'group-1',
                        name: 'Group 1'
                    },
                    {
                        id: 'group-2',
                        name: 'Group 2'
                    },
                    {
                        id: 'group-3',
                        name: 'Group 3'
                    },
                ]);
            }, 3000)
        });
    }
}

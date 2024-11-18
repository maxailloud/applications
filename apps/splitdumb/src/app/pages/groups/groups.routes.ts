import { Route } from '@angular/router';
import { SettingsPage } from '@pages/groups/settings/settings.page';
import { DetailPage } from '@pages/groups/detail/detail.page';
import groupResolver from '@resolvers/group.resolver';

const groupsRoutes: Route[] = [
    {
        path: ':groupId/detail',
        component: DetailPage,
        resolve: {
            group: groupResolver,
        }
    },
    {
        path: ':groupId/settings',
        component: SettingsPage,
        resolve: {
            group: groupResolver,
        }
    },
];
export default groupsRoutes;

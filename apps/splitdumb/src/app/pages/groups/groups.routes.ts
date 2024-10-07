import { Route } from '@angular/router';
import { DetailPage } from '@pages/groups/detail/detail.page';
import groupResolver from '@resolvers/group.resolver';

const groupsRoutes: Route[] = [
    {
        path: 'detail/:groupId',
        component: DetailPage,
        resolve: {
            group: groupResolver,
        }
    },
];
export default groupsRoutes;

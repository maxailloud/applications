import { Route } from '@angular/router';
import groupResolver from '@resolvers/group.resolver';

const appRoutes: Route[] = [
    {
        path: 'home',
        loadComponent: () => import('./pages/home/home.page').then((m) => m.HomePage),
    },
    {
        path: 'group/:groupId',
        loadComponent: () => import('@pages/view-group/view-group.page').then((m) => m.ViewGroupPage),
        resolve: {
            property: groupResolver,
        }
    },
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
    },
];

export default appRoutes;

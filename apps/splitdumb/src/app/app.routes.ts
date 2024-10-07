import { Route } from '@angular/router';

const appRoutes: Route[] = [
    {
        path: 'account',
        loadComponent: () => import('./pages/account/account.page').then((m) => m.AccountPage),
    },
    {
        path: 'groups',
        loadChildren: () => import('./pages/groups/groups.routes'),
    },
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
    },
];

export default appRoutes;

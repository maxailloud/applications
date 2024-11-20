import { Route } from '@angular/router';
import authGuard from '@guards/auth.guard';
import autoLoginGuard from '@guards/auto-login.guard';

const appRoutes: Route[] = [
    {
        path: 'home',
        loadComponent: () => import('@pages/home/home.page'),
        canActivate: [authGuard],
    },
    {
        path: 'account',
        loadComponent: () => import('@pages/account/account.page'),
        canActivate: [authGuard],
    },
    {
        path: 'groups',
        loadChildren: () => import('@pages/groups/groups.routes'),
        canMatch: [authGuard],
    },
    {
        path: 'contacts',
        loadChildren: () => import('@pages/contacts/contacts.routes'),
        canMatch: [authGuard],
    },
    {
        path: 'login',
        loadComponent: () => import('@pages/login/login.page'),
        canActivate: [autoLoginGuard],
    },
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
    },
];

export default appRoutes;

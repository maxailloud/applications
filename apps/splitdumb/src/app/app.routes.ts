import { Route } from '@angular/router';

const appRoutes: Route[] = [
    {
        path: 'home',
        loadComponent: () => import('./pages/home/home.page').then((m) => m.HomePage),
    },
    {
        path: 'message/:id',
        loadComponent: () => import('./pages/view-message/view-message.page').then((m) => m.ViewMessagePage),
    },
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
    },
];

export default appRoutes;

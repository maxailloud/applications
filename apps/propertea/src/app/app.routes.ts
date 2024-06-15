import { Route } from '@angular/router';
import AccountComponent from '@pages/account/account.component';
import LoginComponent from '@pages/login/login.component';
import DashboardComponent from '@pages/dashboard/dashboard.component';

const appRoutes: Route[] = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard',
    },
    {
        path: 'dashboard',
        component: DashboardComponent,
    },
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'account',
        component: AccountComponent,
    },
    {
        path: 'properties',
        loadChildren: () => import('./pages/properties/properties.routes'),
    },
];
export default appRoutes;

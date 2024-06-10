import { Route } from '@angular/router';
import DashboardComponent from '@pages/dashboard/dashboard.component';

export const appRoutes: Route[] = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard'
    },
    {
        path: 'dashboard',
        component: DashboardComponent
    },
    {
        path: 'properties',
        loadChildren: () => import('./pages/properties/properties.routes')
    },
];
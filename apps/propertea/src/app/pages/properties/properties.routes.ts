import { Route } from '@angular/router';
import CreateComponent from '@pages/properties/create/create.component';
import ListComponent from '@pages/properties/list/list.component';

const propertiesRoutes: Route[] = [
    {
        path: '',
        component: ListComponent,
    },
    {
        path: 'create',
        component: CreateComponent,
    },
];
export default propertiesRoutes;

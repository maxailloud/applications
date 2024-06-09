import { Route } from '@angular/router';
import { ListComponent } from '@pages/properties/list/list.component';

export const propertiesRoutes: Route[] = [
    {
        path: '',
        component: ListComponent,
    },
];
 export default propertiesRoutes;

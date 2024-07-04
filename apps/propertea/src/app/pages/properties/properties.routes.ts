import { Route } from '@angular/router';
import CreateComponent from '@pages/properties/create/create.component';
import DetailComponent from '@pages/properties/detail/detail.component';
import ListComponent from '@pages/properties/list/list.component';
import ExpenseCreateComponent from '../../components/expense-create/expense-create.component';
import { propertyResolver } from '../../resolvers/property.resolver';

const propertiesRoutes: Route[] = [
    {
        path: '',
        component: ListComponent,
    },
    {
        path: 'create',
        component: CreateComponent,
    },
    {
        path: 'detail/:propertyId',
        component: DetailComponent,
        resolve: {
            property: propertyResolver,
        }
    },
    {
        path: 'detail/:propertyId/expense-create',
        component: ExpenseCreateComponent,
    },
];
export default propertiesRoutes;

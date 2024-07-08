import { Route } from '@angular/router';
import ExpenseCreateComponent from '@components/expense-create/expense-create.component';
import CreateUpdateComponent from '@pages/properties/create-update/create-update.component';
import DetailComponent from '@pages/properties/detail/detail.component';
import ListComponent from '@pages/properties/list/list.component';
import propertyResolver from '@resolvers/property.resolver';

const propertiesRoutes: Route[] = [
    {
        path: '',
        component: ListComponent,
    },
    {
        path: 'create',
        component: CreateUpdateComponent,
    },
    {
        path: 'update/:propertyId',
        component: CreateUpdateComponent,
        resolve: {
            property: propertyResolver,
        }
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

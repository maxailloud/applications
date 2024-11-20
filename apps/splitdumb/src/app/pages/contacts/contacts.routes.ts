import { Route } from '@angular/router';
import contactResolver from '@resolvers/contact.resolver';

const contactsRoutes: Route[] = [
    {
        path: '',
        loadComponent: () => import('@pages/contacts/list/list.page'),
    },
    {
        path: 'detail/:contactId',
        loadComponent: () => import('@pages/contacts/detail/detail.page'),
        resolve: {
            contact: contactResolver,
        }
    },
];
export default contactsRoutes;

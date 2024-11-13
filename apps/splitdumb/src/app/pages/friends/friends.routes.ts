import { Route } from '@angular/router';
import friendResolver from '@resolvers/friend.resolver';

const friendsRoutes: Route[] = [
    {
        path: '',
        loadComponent: () => import('@pages/friends/list/list.page'),
    },
    {
        path: 'detail/:friendId',
        loadComponent: () => import('@pages/friends/detail/detail.page'),
        resolve: {
            friend: friendResolver,
        }
    },
];
export default friendsRoutes;

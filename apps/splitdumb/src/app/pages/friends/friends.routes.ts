import { Route } from '@angular/router';
import { DetailPage } from '@pages/friends/detail/detail.page';
import { ListPage } from '@pages/friends/list/list.page';
import friendResolver from '@resolvers/friend.resolver';

const friendsRoutes: Route[] = [
    {
        path: '',
        component: ListPage,
    },
    {
        path: 'detail/:friendId',
        component: DetailPage,
        resolve: {
            friend: friendResolver,
        }
    },
];
export default friendsRoutes;

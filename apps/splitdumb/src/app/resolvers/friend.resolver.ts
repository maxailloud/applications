import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, RedirectCommand, ResolveFn, Router } from '@angular/router';
import { SelectUser } from '@schema/schema';
import FriendsStore from '@stores/friends.store';

const friendResolver: ResolveFn<SelectUser> = async (
    route: ActivatedRouteSnapshot,
) => {
    const friendId = route.paramMap.get('friendId');
    const redirectCommand = new RedirectCommand(inject(Router).parseUrl('/'), { skipLocationChange: true, });

    if (!friendId) {
        return redirectCommand;
    }

    const friend = inject(FriendsStore).getFriend(friendId);

    if (!friend) {
        return redirectCommand;
    }

    return friend;
};

export default friendResolver;

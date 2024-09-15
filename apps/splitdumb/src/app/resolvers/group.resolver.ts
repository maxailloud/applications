import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, RedirectCommand, ResolveFn, Router } from '@angular/router';
import Group from '@interfaces/group.interface';
import GroupStore from '@stores/group.store';

const groupResolver: ResolveFn<Group> = async (
    route: ActivatedRouteSnapshot,
) => {
    const groupId = route.paramMap.get('groupId');
    const redirectCommand = new RedirectCommand(inject(Router).parseUrl('/'), { skipLocationChange: true, });

    if (!groupId) {
        return redirectCommand;
    }

    const group = inject(GroupStore).getGroup(groupId);

    if (!group) {
        return redirectCommand;
    }

    return group;
};

export default groupResolver;

import { inject } from '@angular/core';
import { GuardResult, MaybeAsync, Router } from '@angular/router';
import { SessionService } from '@services/session.service';

const autoLoginGuard = (): MaybeAsync<GuardResult> => {
    const sessionService = inject(SessionService);
    const router = inject(Router);

    if (sessionService.isSessionInitialised()) {
        void router.navigateByUrl('/');
        return false;
    }

    return true;
};

export default autoLoginGuard;

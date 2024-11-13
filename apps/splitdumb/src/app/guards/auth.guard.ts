import { inject } from '@angular/core';
import { GuardResult, MaybeAsync, Router } from '@angular/router';
import { SessionService } from '@services/session.service';

const authGuard = (): MaybeAsync<GuardResult> => {
    const sessionService = inject(SessionService);
    const router = inject(Router);

    if (sessionService.isSessionInitialised()) {
        return true;
    }

    void router.navigateByUrl('/login');
    return false;
};

export default authGuard;

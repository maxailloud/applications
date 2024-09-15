import { Injectable, signal, WritableSignal } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class SessionService {
    public isSessionInitialised: WritableSignal<boolean> = signal(false);

    public async initialiseSession(): Promise<void> {
        return new Promise((resolve, reject) => {
            const isInitialised = true;

            if (isInitialised) {
                this.isSessionInitialised.set(true);
                resolve();
            } else {
                reject();
            }
        });
    }
}

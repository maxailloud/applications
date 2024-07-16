import { inject, Injectable, InjectionToken, signal, WritableSignal } from '@angular/core';
import {
    AuthChangeEvent,
    AuthError,
    AuthOtpResponse,
    SupabaseClient,
} from '@supabase/supabase-js';
import { SessionStore } from '@stores/session.store';

export const AUTH_REDIRECT_URL = new InjectionToken<string>('Authentication redirect url');

@Injectable({
    providedIn: 'root',
})
export class SessionService {
    private supabaseClient = inject(SupabaseClient);
    private sessionStore = inject(SessionStore);
    private authenticationRedirectUrl = inject(AUTH_REDIRECT_URL);

    public isSessionInitialised: WritableSignal<boolean> = signal(false);

    public initialiseSession(): Promise<void> {
        return this.supabaseClient.auth.getSession().then(({data}) => {
            if (null !== data.session) {
                this.isSessionInitialised.set(true);
                this.sessionStore.setSession(data.session);
            }
        });
    }

    public monitorAuthChanges(): void {
        this.supabaseClient.auth.onAuthStateChange(
            (event: AuthChangeEvent) => {
                if (event === 'SIGNED_OUT') {
                    this.isSessionInitialised.set(false);
                }
            }
        );
    }

    public signIn(email: string): Promise<AuthOtpResponse> {
        console.log(this.authenticationRedirectUrl);
        return this.supabaseClient.auth.signInWithOtp({
            email,
            options: {
                emailRedirectTo: this.authenticationRedirectUrl
            }
        });
    }

    public signOut(): Promise<{ error: AuthError | null }> {
        return this.supabaseClient.auth.signOut();
    }
}

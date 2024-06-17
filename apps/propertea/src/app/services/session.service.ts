import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { AuthChangeEvent, AuthError, AuthOtpResponse, Session, SupabaseClient } from '@supabase/supabase-js';
import { SessionStore } from '../store/session.store';

@Injectable({
    providedIn: 'root',
})
export class SessionService {
    private supabaseClient = inject(SupabaseClient);
    private sessionStore = inject(SessionStore);

    public isSessionInitialised: WritableSignal<boolean> = signal(false);

    public initialiseSession(): Promise<void> {
        return this.supabaseClient.auth.getSession().then(({ data }) => {
            if (null !== data.session) {
                this.isSessionInitialised.set(true);
                this.sessionStore.setSession(data.session);
            }
        });
    }

    public monitorAuthChanges(): void {
        this.supabaseClient.auth.onAuthStateChange((event: AuthChangeEvent, session: Session | null) => {
            if (event === 'SIGNED_OUT') {
                this.isSessionInitialised.set(false);
            }
        });
    }

    public signIn(email: string): Promise<AuthOtpResponse> {
        return this.supabaseClient.auth.signInWithOtp({ email });
    }

    public signOut(): Promise<{ error: AuthError | null }> {
        return this.supabaseClient.auth.signOut();
    }
}

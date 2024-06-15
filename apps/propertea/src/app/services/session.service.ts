import { inject, Injectable } from '@angular/core';
import type { Subscription } from '@supabase/auth-js/src/lib/types';
import { AuthChangeEvent, AuthError, AuthOtpResponse, Session, SupabaseClient } from '@supabase/supabase-js';
import { SessionStore } from '../store/session.store';

@Injectable({
    providedIn: 'root',
})
export class SessionService {
    private supabaseClient = inject(SupabaseClient);
    private sessionStore = inject(SessionStore);

    private _isSessionInitialised = false;

    public initialiseSession(): Promise<void> {
        return this.supabaseClient.auth.getSession().then(({ data }) => {
            if (null !== data.session) {
                this.setIsSessionInitialised(true);
                this.sessionStore.setSession(data.session);
            }
        });

        // use authChanges here to react to any auth changes
    }

    public isSessionInitialised(): boolean {
        return this._isSessionInitialised;
    }

    public setIsSessionInitialised(value: boolean): this {
        this._isSessionInitialised = value;

        return this;
    }

    public authChanges(callback: (event: AuthChangeEvent, session: Session | null) => void): {
        data: { subscription: Subscription }
    } {
        // TODO: rewrite to use sessionStore
        return this.supabaseClient.auth.onAuthStateChange(callback);
    }

    public signIn(email: string): Promise<AuthOtpResponse> {
        return this.supabaseClient.auth.signInWithOtp({ email });
    }

    public signOut(): Promise<{ error: AuthError | null }> {
        return this.supabaseClient.auth.signOut();
    }
}

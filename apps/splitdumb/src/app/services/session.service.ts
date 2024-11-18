import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { Router } from '@angular/router';
import SessionStore from '@stores/session.store';
import { AuthChangeEvent, SupabaseClient } from '@supabase/supabase-js';

@Injectable({
    providedIn: 'root',
})
export class SessionService {
    private supabaseClient = inject(SupabaseClient);
    private sessionStore = inject(SessionStore);
    private router = inject(Router);

    public isSessionInitialised: WritableSignal<boolean> = signal(false);

    public constructor() {
        this.monitorAuthChanges();
    }

    public async initialiseSession(): Promise<void> {
        return new Promise((resolve, reject) => {
            this.supabaseClient.auth.getSession().then(({data}) => {
                if (null !== data.session) {
                    this.isSessionInitialised.set(true);
                    this.sessionStore.setSession(data.session);
                    resolve();
                } else {
                    reject();
                }
            })
        });
    }

    public monitorAuthChanges(): void {
        this.supabaseClient.auth.onAuthStateChange(
            (event: AuthChangeEvent) => {
                if (event === 'SIGNED_OUT') {
                    this.isSessionInitialised.set(false);
                    void this.router.navigateByUrl('/');
                }
            }
        );
    }

    public async signIn(email: string, password: string): Promise<void> {
        const { data, error } = await this.supabaseClient.auth.signInWithPassword({
            email,
            password,
        });

        if (error) throw error;

        if (data.session) {
            this.sessionStore.setSession(data.session);
            this.isSessionInitialised.set(true);
            void this.router.navigateByUrl('/');
        }
    }

    public async signUp(email: string, password: string): Promise<void> {
        const { data, error } = await this.supabaseClient.auth.signUp({
            email,
            password,
            options: {
                data: {username: email}
            }
        });

        if (error) throw error;

        if (data.session) {
            this.sessionStore.setSession(data.session);
            this.isSessionInitialised.set(true);
        }
    }

    public async signOut(): Promise<void> {
        const {error} = await this.supabaseClient.auth.signOut();

        if (error) {
            throw error;
        } else {
            this.isSessionInitialised.set(false);
        }
    }
}

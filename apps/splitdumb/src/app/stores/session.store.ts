import { Injectable } from '@angular/core';
import { AuthSession, Session } from '@supabase/supabase-js';

@Injectable({
    providedIn: 'root',
})
export default class SessionStore {
    private _session!: AuthSession;

    public getSession(): AuthSession {
        return this._session;
    }

    public setSession(value: Session): void {
        this._session = value;
    }
}

import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SessionStore } from '../../store/session.store';

@Component({
    selector: 'propertea-account',
    standalone: true,
    templateUrl: './account.component.html',
    imports: [
        ReactiveFormsModule,
    ],
})
export default class AccountComponent implements OnInit {
    private sessionStore = inject(SessionStore);

    public email?: string;

    public async ngOnInit(): Promise<void> {
        await this.getProfile();
    }

    public async getProfile(): Promise<void> {
        const { user } = this.sessionStore.getSession();
        this.email = user.email;
    }
}

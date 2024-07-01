import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SessionStore } from '@stores/session.store';

@Component({
    selector: 'propertea-account',
    standalone: true,
    templateUrl: './account.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        ReactiveFormsModule,
    ],
})
export default class AccountComponent {
    private sessionStore = inject(SessionStore);

    public email = signal<string|undefined>(undefined);

    public constructor() {
        const { user } = this.sessionStore.getSession();
        this.email.set(user.email);
    }
}

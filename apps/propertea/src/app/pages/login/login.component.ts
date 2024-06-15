import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { SessionService } from '@services/session.service';

@Component({
    selector: 'propertea-login',
    standalone: true,
    templateUrl: './login.component.html',
    imports: [
        ReactiveFormsModule,
    ],
})
export default class LoginComponent {
    private sessionService = inject(SessionService);
    private formBuilder = inject(FormBuilder);

    public loading = false;

    public signInForm = this.formBuilder.group({
        email: '',
    });

    public async onSubmit (): Promise<void> {
        try {
            this.loading = true;

            const email = this.signInForm.value.email as string;
            const { error } = await this.sessionService.signIn(email);

            if (error) throw error;
            alert('Check your email for the login link!');

        } catch (error) {
            if (error instanceof Error) {
                alert(error.message);
            }
        } finally {
            this.signInForm.reset();
            this.loading = false;
        }
    }
}

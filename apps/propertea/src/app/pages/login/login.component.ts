import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SessionService } from '@services/session.service';

@Component({
    selector: 'propertea-login',
    standalone: true,
    templateUrl: './login.component.html',
    imports: [
        ReactiveFormsModule,
    ],
})
export default class LoginComponent implements OnInit {
    private sessionService = inject(SessionService);
    private formBuilder = inject(FormBuilder);
    private router = inject(Router);

    public loading = false;

    public signInForm = this.formBuilder.group({
        email: '',
    });

    public ngOnInit(): void {
        if (this.sessionService.isSessionInitialised()) {
            void this.router.navigateByUrl('/');
        }
    }

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

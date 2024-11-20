import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { LoginFormFactory } from '@forms/login-form.factory';
import {
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonIcon,
    IonInput,
    IonItem,
    IonTitle,
    IonToolbar,
    LoadingController,
} from '@ionic/angular/standalone';
import { SessionService } from '@services/session.service';
import ToastService from '@services/toast.service';
import { AuthError } from '@supabase/auth-js/dist/module/lib/errors';

@Component({
    selector: 'splitdumb-login',
    standalone: true,
    templateUrl: './login.page.html',
    styleUrls: ['login.page.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        ReactiveFormsModule,
        IonButtons,
        IonHeader,
        IonTitle,
        IonToolbar,
        IonContent,
        IonItem,
        IonInput,
        IonButton,
        IonIcon,
        RouterLink,
    ],
})
export default class LoginPage {
    private sessionService = inject(SessionService);
    private loadingController = inject(LoadingController);
    private toastService = inject(ToastService);

    public isFormSubmitted = signal<boolean>(false);
    public loginForm = LoginFormFactory.createForm();

    // Easy access for form fields
    public get email(): FormControl<string> {
        return this.loginForm.controls.email;
    }

    public get password(): FormControl<string> {
        return this.loginForm.controls.password;
    }

    public async login(): Promise<void> {
        this.isFormSubmitted.set(true);

        if (this.loginForm.valid) {
            try {
                const loading = await this.loadingController.create({message: 'Logging you in...'});

                await loading.present();
                await this.sessionService.signIn(this.email.value, this.password.value);
            } catch (error) {
                await this.toastService.createErrorToast((error as AuthError).message)
                this.isFormSubmitted.set(false);
            } finally {
                this.isFormSubmitted.set(true);
                await this.loadingController.dismiss();
            }
        }
    }

    public async signUp(): Promise<void> {
        this.isFormSubmitted.set(true);

        if (this.loginForm.valid) {
            try {
                const loading = await this.loadingController.create({message: 'Signing you up...'});

                await loading.present();
                await this.sessionService.signUp(this.email.value, this.password.value);
            } catch (error) {
                await this.toastService.createErrorToast((error as AuthError).message)
                this.isFormSubmitted.set(false);
            } finally {
                this.isFormSubmitted.set(true);
                await this.loadingController.dismiss();
            }
        }
    }
}

import { FormControl, FormGroup, Validators, } from '@angular/forms';
import { LoginForm } from '@forms/login-form.type';

export class LoginFormFactory {
    public static createForm(): FormGroup<LoginForm> {
        return new FormGroup<LoginForm>({
            email: new FormControl('', {nonNullable: true, validators: [Validators.required, Validators.email]}),
            password: new FormControl('', {nonNullable: true, validators: [Validators.required]}),
        });
    }
}

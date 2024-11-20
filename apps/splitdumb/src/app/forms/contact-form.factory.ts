import { FormControl, FormGroup, Validators, } from '@angular/forms';
import { ContactForm } from '@forms/contact-form.type';

export default class ContactFormFactory {
    public static createForm(): FormGroup<ContactForm> {
        return new FormGroup<ContactForm>({
            email: new FormControl('', {nonNullable: true, validators: [Validators.required, Validators.email]}),
            username: new FormControl('', {nonNullable: true}),
        });
    }
}

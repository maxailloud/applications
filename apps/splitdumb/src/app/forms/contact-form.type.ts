import { FormControl } from '@angular/forms';

export interface ContactForm {
    email: FormControl<string>;
    username: FormControl<string>;
}

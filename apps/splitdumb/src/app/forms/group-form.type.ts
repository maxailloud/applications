import { FormControl } from '@angular/forms';

export interface GroupForm {
    name: FormControl<string>;
    icon: FormControl<string>;
    currency: FormControl<string>;
}

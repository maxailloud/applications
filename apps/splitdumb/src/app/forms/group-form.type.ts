import { FormControl } from '@angular/forms';
import { SelectUser } from '@schema/schema';

export interface GroupForm {
    name: FormControl<string>;
    icon: FormControl<string>;
    currency: FormControl<string>;
    members: FormControl<SelectUser[]>;
}

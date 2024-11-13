import { FormControl } from '@angular/forms';

export interface FriendForm {
    email: FormControl<string>;
    username: FormControl<string>;
}

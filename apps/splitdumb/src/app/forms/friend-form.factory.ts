import { FormControl, FormGroup, Validators, } from '@angular/forms';
import { FriendForm } from '@forms/friend-form.type';

export class FriendFormFactory {
    public static createForm(): FormGroup<FriendForm> {
        return new FormGroup<FriendForm>({
            email: new FormControl('', {nonNullable: true, validators: [Validators.required, Validators.email]}),
            username: new FormControl('', {nonNullable: true}),
        });
    }
}

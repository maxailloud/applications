import { FormControl, FormGroup, Validators, } from '@angular/forms';
import { GroupForm } from '@forms/group-form.type';
import { SelectGroup, SelectUser } from '@schema/schema';

export class GroupFormFactory {
    public static createForm(groupData?: Partial<SelectGroup & { members: SelectUser[] }>): FormGroup<GroupForm> {
        return new FormGroup<GroupForm>({
            name: new FormControl(groupData?.name ?? '', {nonNullable: true, validators: [Validators.required]}),
            icon: new FormControl(groupData?.icon ?? 'people', {nonNullable: true, validators: [Validators.required]}),
            currency: new FormControl(groupData?.currency ?? '', {nonNullable: true, validators: [Validators.required]}),
            members: new FormControl(groupData?.members ?? [], {nonNullable: true}),
        });
    }
}

import { FormControl, FormGroup, } from '@angular/forms';
import { GroupForm } from '@forms/group-form.type';
import { SelectGroup } from '@schema/schema';

export class GroupFormFactory {
    public static createForm(groupData?: Partial<SelectGroup>): FormGroup<GroupForm> {
        return new FormGroup<GroupForm>({
            name: new FormControl(groupData?.name ?? '', {nonNullable: true}),
            icon: new FormControl(groupData?.icon ?? 'people', {nonNullable: true}),
            currency: new FormControl(groupData?.currency ?? '', {nonNullable: true}),
        });
    }
}

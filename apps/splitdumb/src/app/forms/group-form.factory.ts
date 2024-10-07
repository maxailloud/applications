import { FormControl, FormGroup, } from '@angular/forms';
import { GroupForm } from '@forms/group-form.type';
import { InsertGroup } from '@schema/schema';

export class GroupFormFactory {
    public static createForm(groupData?: Partial<InsertGroup>): FormGroup<GroupForm> {
        return new FormGroup<GroupForm>({
            name: new FormControl(groupData?.name ?? '', {nonNullable: true}),
            icon: new FormControl(groupData?.icon ?? '', {nonNullable: true}),
        });
    }
}

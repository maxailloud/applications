import { SelectGroup, SelectUser } from '@schema/schema';

export default interface GroupExtended extends SelectGroup {
    creator: SelectUser;
    members: SelectUser[];
}

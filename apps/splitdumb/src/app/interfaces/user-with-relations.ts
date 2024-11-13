import { SelectGroup, SelectUser } from '@schema/schema';

export default interface UserWithRelations extends SelectUser {
    groups: SelectGroup[];
    friends: SelectUser[];
}

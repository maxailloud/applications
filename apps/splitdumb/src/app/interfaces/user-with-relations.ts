import { SelectGroup, SelectUser } from '@schema/schema';

export default interface UserWithRelations {
    user: SelectUser;
    groups: SelectGroup[];
    friends: SelectUser[];
}

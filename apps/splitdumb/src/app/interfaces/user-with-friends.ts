import { SelectUser } from '@schema/schema';

export default interface UserWithFriends extends SelectUser {
    friends: SelectUser[];
}

import { SelectUser } from '@schema/schema';

export default interface UserWithContacts extends SelectUser {
    contacts: SelectUser[];
}

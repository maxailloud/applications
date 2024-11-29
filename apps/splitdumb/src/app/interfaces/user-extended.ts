import { SelectUser } from '@schema/schema';

export default interface UserExtended extends SelectUser {
    contacts: SelectUser[];
}

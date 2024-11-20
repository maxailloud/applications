import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, RedirectCommand, ResolveFn, Router } from '@angular/router';
import { SelectUser } from '@schema/schema';
import ContactsStore from '@stores/contactsStore';

const contactResolver: ResolveFn<SelectUser> = async (
    route: ActivatedRouteSnapshot,
) => {
    const contactId = route.paramMap.get('contactId');
    const redirectCommand = new RedirectCommand(inject(Router).parseUrl('/'));

    if (!contactId) {
        return redirectCommand;
    }

    const contact = inject(ContactsStore).getContact(contactId);

    if (!contact) {
        return redirectCommand;
    }

    return contact;
};

export default contactResolver;

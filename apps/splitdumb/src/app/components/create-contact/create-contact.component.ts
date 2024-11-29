import { ChangeDetectionStrategy, Component, inject, viewChild, } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import ContactDataService from '@data-services/contact-data.service';
import UserDataService from '@data-services/user-data.service';
import ModalStatus from '@enums/modal-status.enum';
import ContactFormFactory from '@forms/contact-form.factory';
import {
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonIcon,
    IonInput,
    IonItem,
    IonList,
    IonTitle,
    IonToolbar,
    ModalController,
} from '@ionic/angular/standalone';
import ContactsStore from '@stores/contacts.store';
import { FunctionsFetchError, FunctionsHttpError, FunctionsRelayError } from '@supabase/supabase-js';

@Component({
    selector: 'splitdumb-create-contact',
    standalone: true,
    templateUrl: './create-contact.component.html',
    imports: [
        IonButton,
        IonButtons,
        IonContent,
        IonHeader,
        IonInput,
        IonItem,
        IonTitle,
        IonToolbar,
        IonIcon,
        ReactiveFormsModule,
        IonList,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CreateContactComponent {
    public emailInput = viewChild.required<IonInput>('emailInput');

    private modalController = inject(ModalController);
    private contactDataService = inject(ContactDataService);
    private userDataService = inject(UserDataService);
    private contactsStore = inject(ContactsStore);

    public createContactForm = ContactFormFactory.createForm();

    public async ionViewDidEnter(): Promise<void> {
        void this.emailInput().setFocus();
    }

    public cancel(): Promise<boolean> {
        this.createContactForm.reset();
        return this.modalController.dismiss(null, ModalStatus.DISMISS_CANCEL);
    }

    public async invite(): Promise<void> {
        if (this.createContactForm.valid) {
            const {data: existingContact} = await this.userDataService.readUser(this.createContactForm.controls.email.value);

            if (existingContact) {
                const {data: invitedContact, error, status: errorStatus} = await this.contactDataService.addContact(existingContact.id);

                if (error) {
                    console.error(error, errorStatus);
                } else {
                    this.contactsStore.addContact(existingContact);
                }

                void this.modalController.dismiss(invitedContact, ModalStatus.DISMISS_CONFIRM);
            } else {
                const {data: invitedContact, error} = await this.contactDataService.inviteContact(
                    this.createContactForm.controls.email.value,
                    this.createContactForm.controls.username.value,
                );

                if (error instanceof FunctionsHttpError) {
                    const errorMessage = await error.context.json();
                    console.log('Function returned an error', errorMessage);
                } else if (error instanceof FunctionsRelayError) {
                    console.log('Relay error:', error.message);
                } else if (error instanceof FunctionsFetchError) {
                    console.log('Fetch error:', error.message);
                }

                if (invitedContact) {
                    this.contactsStore.addContact(invitedContact);
                    void this.modalController.dismiss(invitedContact, ModalStatus.DISMISS_CONFIRM);
                }
            }
        }
    }
}

import { ChangeDetectionStrategy, Component, forwardRef, inject, signal, viewChild, } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import {
    IonButton,
    IonButtons, IonCheckbox,
    IonContent,
    IonHeader,
    IonIcon,
    IonItem,
    IonItemDivider, IonItemOption, IonItemOptions, IonItemSliding,
    IonLabel,
    IonList,
    IonModal,
    IonTitle,
    IonToolbar,
} from '@ionic/angular/standalone';
import type { CheckboxChangeEventDetail } from '@ionic/core/components';
import { SelectUser } from '@schema/schema';
import ContactsStore from '@stores/contacts.store';

@Component({
    selector: 'splitdumb-contacts-selector',
    standalone: true,
    templateUrl: './input-contacts-selector.component.html',
    imports: [
        ReactiveFormsModule,
        IonHeader,
        IonToolbar,
        IonButtons,
        IonButton,
        IonIcon,
        IonTitle,
        IonContent,
        IonList,
        IonItem,
        IonModal,
        IonLabel,
        IonItemDivider,
        IonCheckbox,
        IonItemSliding,
        IonItemOptions,
        IonItemOption,
    ],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => InputContactsSelectorComponent),
            multi: true,
        },
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class InputContactsSelectorComponent implements ControlValueAccessor {
    public modal = viewChild.required<IonModal>(IonModal);

    public availableContacts = inject(ContactsStore).getContacts();
    public selectableContacts = signal<SelectUser[]>([]);
    public selectedContacts: SelectUser[] = [];
    public selectedContactIds: string[] = [];
    public isDisabled = signal(false);
    public isSelectorOpen = signal<boolean>(false);

    private _value: SelectUser[] = [];
    private onChangeCallback!: (value: SelectUser[]) => void;
    private onTouchedCallback!: () => void;

    public get value(): SelectUser[] {
        return this._value;
    }

    public set value(value: SelectUser[]) {
        if (value !== this._value) {
            this._value = value;
            this.onChangeCallback(value);
        }
    }

    public writeValue(selectedUsers: SelectUser[]): void {
        this.selectableContacts.set(this.availableContacts()
            .filter(({id: availableUserId}) => !selectedUsers.some(({id: selectedUserId}) => selectedUserId === availableUserId)));

        this.selectedContacts = [...selectedUsers];
        this.selectedContactIds = this.selectedContacts.map(selectedContact => selectedContact.id);
        this._value = [...selectedUsers];
    }

    public registerOnChange(fn: (value?: SelectUser[]) => void): void {
        this.onChangeCallback = fn;
    }

    public registerOnTouched(fn: () => void): void {
        this.onTouchedCallback = fn;
    }

    public setDisabledState(isDisabled: boolean): void {
        this.isDisabled.set(isDisabled);
    }

    public cancel(): void {
        void this.modal().dismiss(this.value, 'cancel');
    }

    public toggleUser(event: CustomEvent<CheckboxChangeEventDetail<SelectUser>>): void {
        if (event.detail.checked) {
            this.selectedContacts.push(event.detail.value);
        } else {
            this.selectedContacts = this.selectedContacts.filter((selectedContact) => selectedContact.id !== event.detail.value.id);
        }

        this.selectedContactIds = this.selectedContacts.map(selectedContact => selectedContact.id);
    }

    public validateSelect(): void {
        this.value = this.selectedContacts;

        void this.modal().dismiss(this.value, 'confirm');
    }

    public openSelector(): void {
        this.isSelectorOpen.set(true);
    }

    public removeUserFromGroup(user: SelectUser): void {
        this.selectedContacts = this.selectedContacts.filter((selectedContact) => selectedContact.id !== user.id);
        this.selectedContactIds = this.selectedContacts.map(selectedContact => selectedContact.id);
        this.value = this.selectedContacts;
    }
}

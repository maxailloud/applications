import { ChangeDetectionStrategy, Component, inject, input, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import ContactsSelectorComponent from '@components/input-contacts-selector/input-contacts-selector.component';
import CurrencySelectorComponent from '@components/input-currency-selector/input-currency-selector.component';
import IconSelectorComponent from '@components/input-icon-selector/input-icon-selector.component';
import GroupDataService from '@data-services/group-data.service';
import { GroupFormFactory } from '@forms/group-form.factory';
import { GroupForm } from '@forms/group-form.type';
import GroupExtended from '@interfaces/group-extended';
import {
    IonBackButton,
    IonButtons,
    IonCol,
    IonContent,
    IonGrid,
    IonHeader,
    IonInput,
    IonItem,
    IonList,
    IonRow,
    IonTitle,
    IonToolbar,
} from '@ionic/angular/standalone';
import ToastService from '@services/toast.service';
import { debounceTime } from 'rxjs';

@Component({
    selector: 'splitdumb-group-settings',
    standalone: true,
    templateUrl: './settings.page.html',
    styleUrls: ['./settings.page.scss'],
    imports: [
        IonItem,
        IonHeader,
        IonToolbar,
        IonButtons,
        IonContent,
        IonTitle,
        IonList,
        IonBackButton,
        IonGrid,
        IonRow,
        IonCol,
        IconSelectorComponent,
        IonInput,
        CurrencySelectorComponent,
        ReactiveFormsModule,
        ContactsSelectorComponent,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsPage implements OnInit {
    public group = input.required<GroupExtended>();

    private groupDataService = inject(GroupDataService);
    private toastService = inject(ToastService);

    public updateGroupForm!: FormGroup<GroupForm>;

    public ngOnInit(): void {
        this.updateGroupForm = GroupFormFactory.createForm(this.group());

        this.updateGroupForm.controls.name.valueChanges
            .pipe(
                debounceTime(500),
            )
            .subscribe(async (value) => {
                this.updateGroupForm.controls.name.disable({emitEvent: false});

                const {error} = await this.groupDataService.updateGroup(this.group().id, {
                    name: value,
                });

                if (error) {
                    await this.toastService.createErrorToast('Error updating group name');
                }

                this.group().name = value;

                this.updateGroupForm.controls.name.enable({emitEvent: false});
            });

        this.updateGroupForm.controls.icon.valueChanges
            .subscribe(async (value) => {
                this.updateGroupForm.controls.icon.disable({emitEvent: false});

                const {error} = await this.groupDataService.updateGroup(this.group().id, {
                    icon: value,
                });

                if (error) {
                    await this.toastService.createErrorToast('Error updating group icon');
                }

                this.group().icon = value;

                this.updateGroupForm.controls.icon.enable({emitEvent: false});
            });

        this.updateGroupForm.controls.currency.valueChanges
            .subscribe(async (value) => {
                this.updateGroupForm.controls.currency.disable({emitEvent: false});

                const {error} = await this.groupDataService.updateGroup(this.group().id, {
                    currency: value,
                });

                if (error) {
                    await this.toastService.createErrorToast('Error updating group currency');
                }

                this.group().currency = value;

                this.updateGroupForm.controls.currency.enable({emitEvent: false});
            });

        this.updateGroupForm.controls.members.valueChanges
            .subscribe(async (newMembers) => {
                this.updateGroupForm.controls.members.disable({emitEvent: false});

                const groupMembers = this.group().members;
                const newMembersToAdd = newMembers.filter(newMember => !groupMembers.includes(newMember));
                const membersToRemove = groupMembers.filter(newMember => !newMembers.includes(newMember));

                if (newMembersToAdd.length > 0) {
                    const {error} = await this.groupDataService.addGroupMembers(this.group().id, newMembersToAdd.map(user => user.id));

                    if (error) {
                        await this.toastService.createErrorToast(`Error adding members to the group`);
                    }
                }

                if (membersToRemove.length > 0) {
                    const {error} = await this.groupDataService.removeGroupMembers(this.group().id, membersToRemove.map(user => user.id));

                    if (error) {
                        await this.toastService.createErrorToast(`Error removing members to the group`);
                    }
                }

                this.group().members = newMembers;

                this.updateGroupForm.controls.members.enable({emitEvent: false});
            });
    }
}

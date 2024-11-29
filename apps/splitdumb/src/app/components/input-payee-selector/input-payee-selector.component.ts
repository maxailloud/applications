import { ChangeDetectionStrategy, Component, computed, forwardRef, input, } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import GroupExtended from '@interfaces/group-extended';
import { IonSelect, IonSelectOption, } from '@ionic/angular/standalone';
import { SelectUser } from '@schema/schema';

@Component({
    selector: 'splitdumb-payee-selector',
    standalone: true,
    templateUrl: './input-payee-selector.component.html',
    imports: [
        ReactiveFormsModule,
        IonSelect,
        IonSelectOption,
    ],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => InputPayeeSelectorComponent),
            multi: true,
        },
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class InputPayeeSelectorComponent implements ControlValueAccessor {
    public group = input.required<GroupExtended>();

    public groupMembers = computed(() => {
        return [this.group().creator, ...this.group().members];
    });
    public isDisabled = false;

    private _value?: SelectUser;
    private onChangeCallback!: (value?: SelectUser) => void;
    private onTouchedCallback!: () => void;

    public get value(): SelectUser|undefined {
        return this._value;
    }

    public set value(value: SelectUser|undefined) {
        if (value !== this._value) {
            this._value = value;
            this.onChangeCallback(value);
        }
    }

    public writeValue(value: SelectUser): void {
        this._value = this.groupMembers().find(member => member.id === value.id);
    }

    public registerOnChange(fn: (value?: SelectUser) => void): void {
        this.onChangeCallback = fn;
    }

    public registerOnTouched(fn: () => void): void {
        this.onTouchedCallback = fn;
    }

    public setDisabledState(isDisabled: boolean): void {
        this.isDisabled = isDisabled;
    }

    public select(selectedUser: SelectUser): void {
        this.value = selectedUser;
    }
}

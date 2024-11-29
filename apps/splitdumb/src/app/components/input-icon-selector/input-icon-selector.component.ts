import { Component, forwardRef, signal, viewChild, WritableSignal, } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import {
    IonButton,
    IonButtons,
    IonContent,
    IonFooter,
    IonHeader,
    IonIcon,
    IonLabel,
    IonModal,
    IonSegment,
    IonSegmentButton,
    IonTitle,
    IonToolbar,
} from '@ionic/angular/standalone';
import type { SegmentChangeEventDetail } from '@ionic/core/components';
import * as ionicons from 'ionicons/dist/ionicons.json';

enum IconType {
    Outline = 'outline',
    Filled = 'filled',
    Sharp = 'sharp',
}

interface Icon {
    id: string;
    name: string;
}

@Component({
    selector: 'splitdumb-icon-selector',
    standalone: true,
    templateUrl: './input-icon-selector.component.html',
    styleUrls: ['./input-icon-selector.component.scss'],
    imports: [
        ReactiveFormsModule,
        IonButton,
        IonModal,
        IonIcon,
        IonHeader,
        IonToolbar,
        IonButtons,
        IonTitle,
        IonContent,
        IonLabel,
        IonFooter,
        IonSegment,
        IonSegmentButton,
    ],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => InputIconSelectorComponent),
            multi: true,
        },
    ],
})
export default class InputIconSelectorComponent implements ControlValueAccessor {
    public modal = viewChild.required<IonModal>(IonModal);

    public icons: Record<IconType.Outline | IconType.Filled | IconType.Sharp, Icon[]> = {
        outline: [],
        filled: [],
        sharp: [],
    };
    public displayedIcons: WritableSignal<Icon[]> = signal([]);
    public iconType = IconType.Outline;

    public isDisabled = false;

    private _value!: string;
    private onChangeCallback!: (value?: string) => void;
    private onTouchedCallback!: () => void;

    public constructor() {
        const outlineRegex = new RegExp(`-${IconType.Outline}$`);
        const sharpRegex = new RegExp(`-${IconType.Sharp}$`);
        const icons: Record<IconType.Outline | IconType.Filled | IconType.Sharp, Icon[]> = {
            outline: [],
            filled: [],
            sharp: [],
        };

        ionicons.icons.forEach(icon => {
            if (outlineRegex.test(icon.name)) {
                icons.outline.push({id: icon.name, name: icon.name});
            } else {
                if (sharpRegex.test(icon.name)) {
                    icons.sharp.push({id: icon.name, name: icon.name});
                } else {
                    icons.filled.push({id: icon.name, name: icon.name});
                }
            }
        });

        this.icons = icons;
        this.displayedIcons.set(this.icons[this.iconType]);
    }

    public get value(): string {
        return this._value;
    }

    public set value(value: string) {
        if (value !== this._value) {
            this._value = value;
            this.onChangeCallback(value);
        }
    }

    public writeValue(value: string): void {
        this._value = value;
    }

    public registerOnChange(fn: (value?: string) => void): void {
        this.onChangeCallback = fn;
    }

    public registerOnTouched(fn: () => void): void {
        this.onTouchedCallback = fn;
    }

    public setDisabledState(isDisabled: boolean): void {
        this.isDisabled = isDisabled;
    }

    public cancel(): void {
        void this.modal().dismiss(this.value, 'cancel');
    }

    public select(selectedIcon: string): void {
        this.value = selectedIcon;

        void this.modal().dismiss(this.value, 'confirm');
    }

    public changeIconType(event: CustomEvent<SegmentChangeEventDetail>): void {
        this.iconType = event.detail.value as IconType;

        this.displayedIcons.set(this.icons[this.iconType]);
    }
}

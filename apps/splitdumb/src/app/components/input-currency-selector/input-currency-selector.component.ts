import { ChangeDetectionStrategy, Component, forwardRef, input, signal, viewChild, WritableSignal, } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import Currency from '@components/input-currency-selector/currency.interface';
import {
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonIcon,
    IonItem,
    IonLabel,
    IonList,
    IonModal,
    IonNote,
    IonTitle,
    IonToolbar,
} from '@ionic/angular/standalone';
import { CurrencySymbolPipe } from '@pipes/currency-symbol.pipe';

@Component({
    selector: 'splitdumb-currency-selector',
    standalone: true,
    templateUrl: './input-currency-selector.component.html',
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
        CurrencySymbolPipe,
        IonLabel,
        IonNote,
    ],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => InputCurrencySelectorComponent),
            multi: true,
        },
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class InputCurrencySelectorComponent implements ControlValueAccessor {
    public modal = viewChild.required<IonModal>(IonModal);
    public onlyButton = input<boolean>(false);

    public currencies: WritableSignal<Currency[]> = signal([]);
    public currency!: Currency; // select a default one
    public isDisabled = false;
    public isSelectorOpen = signal<boolean>(false);

    private _value?: string;
    private onChangeCallback!: (value?: string) => void;
    private onTouchedCallback!: () => void;

    public constructor() {
        const currencies: Currency[] = [];

        Intl.supportedValuesOf('currency').forEach((currency) => {
            const currencySymbol = Intl.NumberFormat('en', {
                style: 'currency',
                currency: currency
            }).formatToParts().find(part => part.type === 'currency');

            if (currencySymbol) {
                const currencyNames = new Intl.DisplayNames(["en"], { type: "currency" });

                currencies.push({id: currency, label: currencySymbol.value, name: currencyNames.of(currency) ?? ''});
            } else {
                console.warn(`Currency ${currency} does not exist`);
            }
        });

        this.currencies.set(currencies);
    }

    public get value(): string|undefined {
        return this._value;
    }

    public set value(value: string|undefined) {
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
        void this.modal().dismiss(this.currency, 'cancel');
    }

    public select(selectedCurrency: Currency): void {
        this.currency = selectedCurrency;
        this.value = selectedCurrency.id;

        void this.modal().dismiss(this.currency, 'confirm');
    }

    public openSelector(): void {
        this.isSelectorOpen.set(true);
    }
}

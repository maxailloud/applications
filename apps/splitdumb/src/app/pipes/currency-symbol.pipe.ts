import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'sdCurrencySymbol',
    standalone: true,
})
export class CurrencySymbolPipe implements PipeTransform {
    public transform(value: string): string {
        const currency = Intl.NumberFormat('en', {
            style: 'currency',
            currency: value
        }).formatToParts().find(part => part.type === 'currency');
        let currencySymbol = '';

        if (currency) {
            currencySymbol = currency.value;
        }

        return currencySymbol;
    }
}

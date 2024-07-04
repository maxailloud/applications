import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable()
export class ExpenseFormFactory {
    public createForm(): FormGroup<{name: FormControl<string>, amount: FormControl<number>}> {
        return new FormGroup({
            name: new FormControl('', {validators: [Validators.required], nonNullable: true}),
            amount: new FormControl(0, {validators: [Validators.required], nonNullable: true}),
        });
    }
}

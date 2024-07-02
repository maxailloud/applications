import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable()
export class PropertyFormFactory {
    public createForm(): FormGroup<{name: FormControl<string>, address: FormControl<string>}> {
        return new FormGroup({
            name: new FormControl('', {validators: [Validators.required], nonNullable: true}),
            address: new FormControl('', {validators: [Validators.required], nonNullable: true}),
        });
    }
}

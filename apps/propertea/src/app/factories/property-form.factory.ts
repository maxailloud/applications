import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { InsertProperty } from '@schema/schema';

interface PropertyFormType {
    name: FormControl<string>;
    address: FormControl<string>;
    rent: FormControl<string>;
    mortgage: FormControl<string>;
}
@Injectable()
export class PropertyFormFactory {
    public createForm(property: InsertProperty = {name: '', address: '', rent: '0', mortgage: '0', userId: ''}):
    FormGroup<PropertyFormType> {
        return new FormGroup({
            name: new FormControl(property.name, {validators: [Validators.required], nonNullable: true}),
            address: new FormControl(property.address, {validators: [Validators.required], nonNullable: true}),
            rent: new FormControl(property.rent, {validators: [Validators.required], nonNullable: true}),
            mortgage: new FormControl(property.mortgage, {validators: [Validators.required], nonNullable: true}),
        });
    }
}

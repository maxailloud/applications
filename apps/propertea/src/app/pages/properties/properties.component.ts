import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ListComponent } from './list/list.component';

@Component({
    selector: 'propertea-properties',
    standalone: true,
    imports: [
        ListComponent,
        RouterOutlet
    ],
    templateUrl: 'properties.component.html',
})
export class PropertiesComponent {
}

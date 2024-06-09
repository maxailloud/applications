import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'propertea-properties-list',
    standalone: true,
    templateUrl: 'list.component.html',
    imports: [
        RouterLink
    ]
})
export class ListComponent {
}

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import ListComponent from './list/list.component';

@Component({
    selector: 'propertea-property',
    standalone: true,
    templateUrl: 'properties.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        ListComponent,
        RouterOutlet,
    ],
})
export class PropertiesComponent {
}

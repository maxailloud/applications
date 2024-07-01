import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'propertea-property-create',
    standalone: true,
    templateUrl: 'create.component.html',
    styleUrl: 'create.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        RouterLink,
    ]
})
export default class CreateComponent {
    public constructor() {
        console.log('createProperties');
    }
}

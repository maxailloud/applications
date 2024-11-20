import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'splitdumb-contacts',
    standalone: true,
    templateUrl: 'contacts.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        RouterOutlet,
    ],
})
export class ContactsComponent {
}

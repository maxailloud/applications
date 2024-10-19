import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'splitdumb-friends',
    standalone: true,
    templateUrl: 'friends.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        RouterOutlet,
    ],
})
export class FriendsComponent {
}

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'splitdumb-groups',
    standalone: true,
    templateUrl: 'groups.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        RouterOutlet,
    ],
})
export class GroupsComponent {
}

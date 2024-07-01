import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'propertea-dashboard',
    standalone: true,
    templateUrl: 'dashboard.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        RouterLink,
    ]
})
export default class DashboardComponent {
}

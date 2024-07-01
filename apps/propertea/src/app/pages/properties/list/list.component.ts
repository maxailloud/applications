import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'propertea-property-list',
    standalone: true,
    templateUrl: 'list.component.html',
    styleUrl: 'list.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        RouterLink,
    ]
})
export default class ListComponent {
    public isLoading = signal<boolean>(true);
    public properties = signal<{name: string; description: string}[]>([]);

    public constructor() {
        this.properties.set([
            {
                name: '1-5350 Avenue Bourbonniere',
                description: '5350 Avenue Bourbonniere, H1X 2M9, Montreal QC, Canada'
            }
        ]);

        setTimeout(() => {
            this.isLoading.set(false);
        }, 1000);
    }
}

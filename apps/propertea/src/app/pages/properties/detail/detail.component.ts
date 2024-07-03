import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SelectProperty } from '@schema/schema';

@Component({
    selector: 'propertea-property-detail',
    standalone: true,
    templateUrl: 'detail.component.html',
    styleUrl: 'detail.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class DetailComponent implements OnInit {
    private activatedRoute = inject(ActivatedRoute);

    public property = signal<SelectProperty|undefined>(undefined);

    public ngOnInit():void {
        this.property.set(this.activatedRoute.snapshot.data.property);
    }
}

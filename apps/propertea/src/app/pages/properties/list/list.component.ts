import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SupabaseClient } from '@supabase/supabase-js';

@Component({
    selector: 'propertea-properties-list',
    standalone: true,
    templateUrl: 'list.component.html',
    styleUrl: 'list.component.scss',
    imports: [
        RouterLink,
    ]
})
export default class ListComponent {
    private supabaseClient = inject(SupabaseClient);

    public isLoading = true;
    public properties = signal<{name: string; description: string}[]>([]);

    public loadProperties(): void {
        this.properties.set([
            {
                name: '1-5350 Avenue Bourbonniere',
                description: '5350 Avenue Bourbonniere, H1X 2M9, Montreal QC, Canada'
            }
        ]);
        this.isLoading = false;
    }
}

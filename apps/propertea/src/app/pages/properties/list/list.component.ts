import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SupabaseClient } from '@supabase/supabase-js';

@Component({
    selector: 'propertea-properties-list',
    standalone: true,
    templateUrl: 'list.component.html',
    imports: [
        RouterLink,
    ]
})
export default class ListComponent implements OnInit {
    private supabaseClient = inject(SupabaseClient);

    public ngOnInit(): void {
        console.log('pouet');
    }
}

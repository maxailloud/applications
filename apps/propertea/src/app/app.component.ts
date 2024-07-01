import { NgIf } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, effect, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { SessionService } from '@services/session.service';

@Component({
    standalone: true,
    imports: [
        RouterModule,
        NgIf,
    ],
    selector: 'propertea-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
    ],
})
export class AppComponent {
    private sessionService = inject(SessionService);
    private router = inject(Router);

    public mainMenuOpen = false;
    public isSessionInitialised = this.sessionService.isSessionInitialised;

    public constructor() {
        this.sessionService.monitorAuthChanges();

        effect(() => {
            if (!this.isSessionInitialised()) {
                void this.router.navigateByUrl('/login');
            }
        });
    }

    public async logOut(): Promise<void> {
        await this.sessionService.signOut();
    }
}

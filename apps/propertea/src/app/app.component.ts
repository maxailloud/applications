import { NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { SessionService } from '@services/session.service';
import { SessionStore } from './store/session.store';

@Component({
    standalone: true,
    imports: [
        RouterModule,
        NgIf,
    ],
    selector: 'propertea-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
    private sessionService = inject(SessionService);
    private sessionStore = inject(SessionStore);
    private router = inject(Router);

    public mainMenuOpen = false;
    public isUserAuthenticated = false;

    public ngOnInit(): void {
        this.sessionService.authChanges((_, session) => {
            console.log('change in authentication');
            //this.session = session;
        });

        if (!this.sessionService.isSessionInitialised()) {
            void this.router.navigateByUrl('/login');
        } else {
            this.isUserAuthenticated = true;
        }
    }

    public async logOut(): Promise<void> {
        await this.sessionService.signOut();
    }
}

import { Component, inject } from '@angular/core';
import SideMenuComponent from '@components/side-menu/side-menu.component';
import { IonApp, IonContent, IonRouterOutlet, IonSplitPane, } from '@ionic/angular/standalone';
import DarkModeService from '@services/dark-mode.service';
import { SessionService } from '@services/session.service';

@Component({
    selector: 'splitdumb-root',
    standalone: true,
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss'],
    imports: [
        IonRouterOutlet,
        IonApp,
        IonSplitPane,
        SideMenuComponent,
        IonContent,
    ],
})
export class AppComponent {
    private sessionService = inject(SessionService);
    private darkModeService = inject(DarkModeService);

    public isSessionInitialised = this.sessionService.isSessionInitialised;

    public constructor() {
        this.darkModeService.watchMediaQueryChange();
    }
}

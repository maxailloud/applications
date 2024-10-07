import { Component, computed, inject, OnInit } from '@angular/core';
import SideMenuComponent from '@components/side-menu/side-menu.component';
import { IonApp, IonRouterOutlet, IonSplitPane, } from '@ionic/angular/standalone';
import DarkModeService from '@services/dark-mode.service';
import GroupStore from '@stores/group.store';

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
    ],
})
export class AppComponent implements OnInit {
    private darkModeService = inject(DarkModeService);
    private groupFromStore = inject(GroupStore).getGroups();

    public groups = computed(() => this.groupFromStore());

    public ngOnInit(): void {
        this.darkModeService.watchMediaQueryChange();
    }
}

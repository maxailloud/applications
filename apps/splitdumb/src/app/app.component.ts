import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
    IonApp,
    IonRouterOutlet,
} from '@ionic/angular/standalone';

@Component({
    selector: 'splitdumb-root',
    standalone: true,
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss'],
    imports: [
        CommonModule,
        IonRouterOutlet,
        IonApp,
    ],
})
export class AppComponent {
}

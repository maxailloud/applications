import { ChangeDetectionStrategy, Component, input, } from '@angular/core';
import { IonButtons, IonContent, IonHeader, IonMenuButton, IonTitle, IonToolbar, } from '@ionic/angular/standalone';
import { SelectUser } from '@schema/schema';

@Component({
    selector: 'splitdumb-user-detail',
    standalone: true,
    templateUrl: './detail.page.html',
    styleUrls: ['./detail.page.scss'],
    imports: [
        IonContent,
        IonHeader,
        IonToolbar,
        IonButtons,
        IonMenuButton,
        IonTitle,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailPage {
    public friend = input.required<SelectUser>();
}

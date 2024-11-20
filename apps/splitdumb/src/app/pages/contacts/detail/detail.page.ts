import { ChangeDetectionStrategy, Component, input, } from '@angular/core';
import { IonBackButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, } from '@ionic/angular/standalone';
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
        IonTitle,
        IonBackButton,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class DetailPage {
    public contact = input.required<SelectUser>();
}

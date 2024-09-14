import { CommonModule } from '@angular/common';
import {
    Component,
    Input,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonIcon, IonItem, IonLabel, IonNote } from '@ionic/angular/standalone';
import { Message } from '@services/data.service';

@Component({
    selector: 'splitdumb-message',
    standalone: true,
    templateUrl: './message.component.html',
    styleUrls: ['./message.component.scss'],
    imports: [
        CommonModule,
        RouterModule,
        IonItem,
        IonLabel,
        IonNote,
        IonIcon,
    ]
})
export default class MessageComponent {
    @Input({ required: true }) public message!: Message;
}

import { CommonModule } from '@angular/common';
import {
    Component,
    Input,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import Group from '@interfaces/group.interface';
import { IonIcon, IonItem, IonLabel, IonNote } from '@ionic/angular/standalone';

@Component({
    selector: 'splitdumb-group',
    standalone: true,
    templateUrl: './group.component.html',
    styleUrls: ['./group.component.scss'],
    imports: [
        CommonModule,
        RouterModule,
        IonItem,
        IonLabel,
        IonNote,
        IonIcon,
    ]
})
export default class GroupComponent {
    @Input({ required: true }) public group!: Group;
}

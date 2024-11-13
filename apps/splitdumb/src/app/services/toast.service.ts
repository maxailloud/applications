import { inject, Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Color } from '@ionic/core';

@Injectable({
    providedIn: 'root',
})
export default class ToastService {
    private toastController = inject(ToastController);

    public async createErrorToast(message: string): Promise<void> {
        await this.createToast(message, 'danger');
    }

    private async createToast(message: string, color: Color): Promise<void> {
        const toast = await this.toastController.create({
            message: message,
            color: color,
        });

        await toast.present();
    }
}

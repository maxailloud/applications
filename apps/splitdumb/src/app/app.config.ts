import { provideHttpClient, withFetch } from '@angular/common/http';
import {
    APP_INITIALIZER,
    ApplicationConfig,
    provideExperimentalZonelessChangeDetection,
} from '@angular/core';
import { PreloadAllModules, provideRouter, RouteReuseStrategy, withComponentInputBinding, withPreloading } from '@angular/router';
import { IonicRouteStrategy } from '@ionic/angular';
import { provideIonicAngular } from '@ionic/angular/standalone';
import appIconsImporter from './app.icons';
import appRoutes from './app.routes';

export const appConfig: ApplicationConfig = {

    providers: [
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
        provideIonicAngular(),
        provideRouter(appRoutes, withComponentInputBinding(), withPreloading(PreloadAllModules)),
        provideHttpClient(
            withFetch(),
        ),
        provideExperimentalZonelessChangeDetection(),
        {
            provide: APP_INITIALIZER,
            useFactory: appIconsImporter,
            multi: true,
        },
    ],
};

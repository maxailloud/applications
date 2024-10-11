import { provideHttpClient, withFetch } from '@angular/common/http';
import {
    APP_INITIALIZER,
    ApplicationConfig, isDevMode,
    provideExperimentalZonelessChangeDetection,
} from '@angular/core';
import { PreloadAllModules, provideRouter, RouteReuseStrategy, withComponentInputBinding, withPreloading } from '@angular/router';
import appInitialiserFactory from '@factories/app-initialiser.factory';
import { IonicRouteStrategy } from '@ionic/angular';
import { provideIonicAngular } from '@ionic/angular/standalone';
import DataService from '@services/data.service';
import { SessionService } from '@services/session.service';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import appRoutes from './app.routes';
import { addIcons } from 'ionicons';
import * as allIcons from 'ionicons/icons';
import * as useIcons from './app.icons';

export const appConfig: ApplicationConfig = {
    providers: [
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
        provideIonicAngular({
            useSetInputAPI: true,
        }),
        provideRouter(appRoutes, withComponentInputBinding(), withPreloading(PreloadAllModules)),
        provideHttpClient(
            withFetch(),
        ),
        provideExperimentalZonelessChangeDetection(),
        {
            provide: SupabaseClient,
            useFactory: () => createClient(
                process.env['SPLITDUMB_SUPABASE_URL'] as string,
                process.env['SPLITDUMB_SUPABASE_KEY'] as string,
            ),
        },
        {
            provide: APP_INITIALIZER,
            useFactory: appInitialiserFactory,
            multi: true,
            deps: [SessionService, DataService],
        },
    ],
};

addIcons(isDevMode() ? allIcons : useIcons);

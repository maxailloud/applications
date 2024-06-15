import { provideHttpClient, withFetch } from '@angular/common/http';
import {
    APP_INITIALIZER,
    ApplicationConfig,
    provideExperimentalZonelessChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { SessionService } from '@services/session.service';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import initializeAppFactory from './app.factory';
import appRoutes from './app.routes';

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(appRoutes),
        provideHttpClient(
            withFetch(),
        ),
        provideExperimentalZonelessChangeDetection(),
        {
            provide: SupabaseClient,
            useFactory: () => createClient(
                process.env['PROPERTEA_SUPABASE_URL'] as string,
                process.env['PROPERTEA_SUPABASE_KEY'] as string,
            ),
        },
        {
            provide: APP_INITIALIZER,
            useFactory: initializeAppFactory,
            multi: true,
            deps: [SessionService],
        },
    ],
};

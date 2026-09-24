import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { IMAGE_LOADER, ImageLoaderConfig } from '@angular/common';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideServiceWorker } from '@angular/service-worker';
import { NgxGoogleAnalyticsModule } from 'ngx-google-analytics';

import { routes } from './app-routing';
import { environment } from '../environments/environment';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideServiceWorker('ngsw-worker.js', {
      enabled: environment.production,
      registrationStrategy: 'registerWhenStable:30000'
    }),
    importProvidersFrom(NgxGoogleAnalyticsModule.forRoot('G-YP1CFCTRZK')),
    {
      provide: IMAGE_LOADER,
      useValue: (config: ImageLoaderConfig) => {
        if (!environment.production) {
          return config.src;
        }

        const imageWithoutExtension = config.src.substring(0, config.src.lastIndexOf('.'));
        return `${imageWithoutExtension}.webp`;
      }
    },
    provideClientHydration(withEventReplay())
  ]
};
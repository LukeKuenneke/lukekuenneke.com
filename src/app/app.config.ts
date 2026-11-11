import { ApplicationConfig, provideAppInitializer } from '@angular/core';
import { IMAGE_LOADER, ImageLoaderConfig } from '@angular/common';
import { provideClientHydration, withEventReplay, withNoHttpTransferCache } from '@angular/platform-browser';
import { provideRouter, withInMemoryScrolling } from '@angular/router';

import { routes } from './app-routing';
import { environment } from '../environments/environment';

const GA_TRACKING_CODE = 'G-YP1CFCTRZK';

function initBrowserServices(): void {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return;
  }

  if (environment.production && 'serviceWorker' in navigator) {
    window.addEventListener(
      'load',
      () => {
        setTimeout(() => {
          navigator.serviceWorker.register('ngsw-worker.js').catch((err) => console.error(err));
        }, 30000);
      },
      { once: true }
    );
  }

  const win = window as Window & { dataLayer?: unknown[]; gtag?: (...args: unknown[]) => void };
  win.dataLayer = win.dataLayer || [];
  win.gtag = win.gtag || function () {
    // eslint-disable-next-line prefer-rest-params
    win.dataLayer!.push(arguments);
  };
  win.gtag('js', new Date());
  win.gtag('config', GA_TRACKING_CODE);

  let loaded = false;
  const loadScript = () => {
    if (loaded) {
      return;
    }
    loaded = true;
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_CODE}`;
    document.head.appendChild(script);
  };

  for (const eventName of ['pointerdown', 'keydown', 'touchstart', 'scroll']) {
    window.addEventListener(eventName, loadScript, { once: true, passive: true });
  }
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      routes,
      withInMemoryScrolling({
        anchorScrolling: 'enabled',
        scrollPositionRestoration: 'enabled'
      })
    ),
    provideAppInitializer(initBrowserServices),
    {
      provide: IMAGE_LOADER,
      useValue: (config: ImageLoaderConfig) => {
        const extensionIndex = config.src.lastIndexOf('.');
        const imageWithoutExtension = config.src.substring(0, extensionIndex);
        const extension = environment.production ? 'webp' : config.src.substring(extensionIndex + 1);
        const widthSuffix = config.width && config.width < 644 ? `-${config.width}w` : '';
        return `${imageWithoutExtension}${widthSuffix}.${extension}`;
      }
    },
    provideClientHydration(withEventReplay(), withNoHttpTransferCache())
  ]
};

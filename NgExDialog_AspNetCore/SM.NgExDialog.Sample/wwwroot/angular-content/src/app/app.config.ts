import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './dialog-demo/app.routes';
//import { importProvidersFrom } from '@angular/core';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    //importProvidersFrom([ExDialog, DialogService, NgExDialogConfig]) //No need when setting root scope in service classes.
  ]
};

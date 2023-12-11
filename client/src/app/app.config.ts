import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { ApplicationConfig } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';

import { authInterceptor, authRoutes } from '@auth';
import { provideApi } from '@api';
import { withRoutes } from '@shared/common';
import { coreRoutes, provideAppTitleStrategy } from '@core';

export const appConfig: ApplicationConfig = {
  providers: [
    provideApi(),
    provideHttpClient(withInterceptors([authInterceptor])),
    importProvidersFrom(BrowserModule),
    provideAnimations(),
    provideRouter(withRoutes(authRoutes, coreRoutes)),
    provideAppTitleStrategy(),
  ],
};

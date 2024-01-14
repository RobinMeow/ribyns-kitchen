import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { ApplicationConfig } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { authInterceptor, authRoutes } from 'src/app/auth';
import { provideApi } from 'src/app/api';
import { withRoutes } from 'src/app/shared/common';
import {
  coreRoutes,
  provideAppName,
  provideAppTitleStrategy,
} from 'src/app/core';
import { recipeRoutes } from '@recipe';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAppName(),
    provideApi(),
    provideHttpClient(withInterceptors([authInterceptor])),
    importProvidersFrom(BrowserModule),
    provideAnimations(),
    provideRouter(withRoutes(authRoutes, recipeRoutes, coreRoutes)),
    provideAppTitleStrategy(),
  ],
};

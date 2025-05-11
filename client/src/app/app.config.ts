import { provideHttpClient, withInterceptors } from '@angular/common/http'
import {
  importProvidersFrom,
  provideExperimentalZonelessChangeDetection
} from '@angular/core'
import { ApplicationConfig } from '@angular/core'
import { provideAnimations } from '@angular/platform-browser/animations'
import { provideRouter } from '@angular/router'
import { BrowserModule } from '@angular/platform-browser'

import { authInterceptor, authRoutes } from '@auth'
import { provideApiBaseUrl } from '@api'
import { coreRoutes, provideAppTitleStrategy } from '@core'
import { recipeRoutes } from '@recipe'
import { errorFeedbackInterceptor } from '@shared/feedback'
import { withRoutes } from '@common'

export const appConfig: ApplicationConfig = {
  providers: [
    provideExperimentalZonelessChangeDetection(),
    provideApiBaseUrl(),
    provideHttpClient(
      withInterceptors([authInterceptor, errorFeedbackInterceptor])
    ),
    importProvidersFrom(BrowserModule),
    provideAnimations(),
    provideRouter(withRoutes(authRoutes, recipeRoutes, coreRoutes)),
    provideAppTitleStrategy()
  ]
}

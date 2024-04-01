import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core'
import { environment } from 'src/environments/environment'
import { API_BASE_URL } from './api_base_url'

export const provideApiBaseUrl = function (): EnvironmentProviders {
  return makeEnvironmentProviders([
    {
      provide: API_BASE_URL,
      useValue: environment.API_BASE_URL
    }
  ])
}

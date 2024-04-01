import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core'
import { API_BASE_URL } from './API-BASE-URL'

export const provideApiBaseUrlTesting = function (): EnvironmentProviders {
  return makeEnvironmentProviders([
    {
      provide: API_BASE_URL,
      useValue: 'fake-url'
    }
  ])
}

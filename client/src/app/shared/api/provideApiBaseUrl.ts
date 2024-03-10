import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { environment } from 'src/environments/environment';
import { API_BASE_URL } from './API-BASE-URL';

export const provideApiBaseUrl = function (): EnvironmentProviders {
  return makeEnvironmentProviders([
    {
      provide: API_BASE_URL,
      useValue: environment.API_BASE_URL,
    },
  ]);
};

export const provideApiBaseUrlTesting = function (): EnvironmentProviders {
  return makeEnvironmentProviders([
    {
      provide: API_BASE_URL,
      useValue: 'fake-url',
    },
  ]);
};

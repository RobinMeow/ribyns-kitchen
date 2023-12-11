import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { BASE_PATH } from '@open-api';
import { environment } from 'src/environments/environment';

export const provideApi = function (): EnvironmentProviders {
  return makeEnvironmentProviders([
    {
      provide: BASE_PATH,
      useValue: environment.API_BASE_URL,
    },
  ]);
};

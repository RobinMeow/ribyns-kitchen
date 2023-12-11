import {
  EnvironmentProviders,
  InjectionToken,
  makeEnvironmentProviders,
} from '@angular/core';

export const APP_NAME = new InjectionToken<string>(
  'name of the application for display prupose',
);

export function provideAppName(): EnvironmentProviders {
  return makeEnvironmentProviders([
    {
      provide: APP_NAME,
      useValue: 'Geschmack nach Christlicher Art',
    },
  ]);
}

import { ValueProvider } from '@angular/core';
import { BASE_PATH } from '../openapi-services';
import { environment } from 'src/environments/environment';

export const provideOpenApiBasePath = function (): ValueProvider {
  return {
    provide: BASE_PATH,
    useValue: environment.API_BASE_URL,
  };
};

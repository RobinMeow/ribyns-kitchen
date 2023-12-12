import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from './auth.service';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const authorizedGuard: CanActivateFn = (route, state) => {
  return inject(AuthService).isAuthorizedSignal()();
};

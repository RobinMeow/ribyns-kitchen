import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from './auth.service';

export const authorizedGuard: CanActivateFn = (route, state) => {
  return inject(AuthService).isAuthorizedSignal()();
};

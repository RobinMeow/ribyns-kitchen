import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthDomainService } from '../auth.domain.service';

export const authorizedGuard: CanActivateFn = (route, state) => {
  return inject(AuthDomainService).isAuthorizedSignal()();
};

import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthDomainService } from './auth.domain.service';

export const loggedOutGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const currentUserSignal = inject(AuthDomainService).getCurrentUserSignal()();
  const isLoggedOut = currentUserSignal === null;

  if (!isLoggedOut) {
    router.navigateByUrl('/');
  }

  return isLoggedOut;
};

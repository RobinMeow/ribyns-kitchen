import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthDomainService } from '../utils/auth.domain.service';

/** redirects to home, if authorized to protect the route which is reserved for unauthorized users. Like login. */
export const unauthorizedGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const isAuthorized = inject(AuthDomainService).isAuthorizedSignal()();

  if (isAuthorized) {
    router.navigateByUrl('/');
  }

  return !isAuthorized;
};

import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthDomainService } from './auth.domain.service';

export const loggedOutGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthDomainService);
  const signal = authService.getCurrentUserSignal();
  console.log('authService.getCurrentUserSignal()', signal());

  return signal() === null;
};

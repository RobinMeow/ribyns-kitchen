import { inject } from '@angular/core'
import { CanActivateFn, Router } from '@angular/router'
import { AuthService } from './auth_service'

/**
 * redirects to home, if authorized to protect the route which is reserved for unauthorized users. Like login.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const unauthorizedGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)

  const isAuthorized = inject(AuthService).isAuthorized()()

  if (isAuthorized) {
    router.navigateByUrl('/')
  }

  return !isAuthorized
}

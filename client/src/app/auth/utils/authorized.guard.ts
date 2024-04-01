import { inject } from '@angular/core'
import { CanActivateFn } from '@angular/router'
import { AuthService } from './auth.service'
import { FeedbackService } from '@shared/feedback'

/** @__PURE__ */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const authorizedGuard: CanActivateFn = (route, state) => {
  const isAuthorized = inject(AuthService).isAuthorized()()

  if (!isAuthorized)
    inject(FeedbackService).show('Nicht autorisiert. Bitte einloggen.')

  return isAuthorized
}

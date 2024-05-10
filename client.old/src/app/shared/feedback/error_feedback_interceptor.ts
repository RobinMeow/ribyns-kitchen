import {
  HttpErrorResponse,
  HttpEvent,
  HttpInterceptorFn
} from '@angular/common/http'
import { inject } from '@angular/core'
import { Observable, tap } from 'rxjs'
import { FeedbackService } from './feedback_service'

export const errorFeedbackInterceptor: HttpInterceptorFn = (
  req,
  next
): Observable<HttpEvent<unknown>> => {
  const feedbackService = inject(FeedbackService)
  return next(req).pipe(
    tap({
      error: (err) => {
        if (err instanceof HttpErrorResponse) {
          const notifications = err.error.notifications
          if (notifications) {
            notifications.forEach((notification: string) => {
              feedbackService.show(notification)
            })
          } else {
            feedbackService.show(err.error)
          }
        }
      }
    })
  )
}

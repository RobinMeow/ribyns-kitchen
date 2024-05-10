import { HttpInterceptorFn } from '@angular/common/http'
import { inject } from '@angular/core'
import { TokenStorage } from './token_storage'
import { environment } from 'src/environments/environment'

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  if (!req.url.startsWith(environment.API_BASE_URL)) return next(req)

  const tokenStorage = inject(TokenStorage)
  const token = tokenStorage.retrieve()

  if (!token) return next(req)

  return next(
    req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    })
  )
}

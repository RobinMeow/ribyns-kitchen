import { TestBed } from '@angular/core/testing'
import {
  HttpEvent,
  HttpHandlerFn,
  HttpHeaders,
  HttpInterceptorFn,
  HttpRequest,
  provideHttpClient
} from '@angular/common/http'

import { authInterceptor } from './auth_interceptor'
import { firstValueFrom, of } from 'rxjs'
import { provideHttpClientTesting } from '@angular/common/http/testing'
import { API_BASE_URL } from '@api'
import { TokenStorage } from './token_storage'

describe('authInterceptor should', () => {
  const interceptor: HttpInterceptorFn = (req, next) =>
    TestBed.runInInjectionContext(() => authInterceptor(req, next))
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: API_BASE_URL, useValue: 'api-base-url' },
        {
          provide: TokenStorage,
          useValue: {
            retrieve() {
              return 'token'
            }
          }
        }
      ]
    })
  })

  it('be created', () => {
    expect(interceptor).toBeTruthy()
  })

  it('append Authroize Header to API calls', async () => {
    const req = new HttpRequest('GET', 'api-base-url')
    expect(req.headers.has('Authorization')).toBeFalsy()

    const nextHandler = (req: HttpRequest<unknown>) =>
      of(req.headers as unknown as HttpEvent<unknown>)

    const evt = await firstValueFrom(interceptor(req, nextHandler))
    const headers = evt as unknown as HttpHeaders
    expect(headers.get('Authorization')).toEqual('Bearer token')
  })
  ;[
    'http://other-domain.com',
    'http://other-domain.com?returnUrl=' + 'api-base-url'
  ].forEach((url: string) => {
    it('not append Authroize Header to non API calls', () => {
      const req = new HttpRequest('GET', url)
      expect(req.headers.has('Authorize')).toBeFalsy()

      const nextHandler: HttpHandlerFn = (req: HttpRequest<unknown>) =>
        of(req.headers as unknown as HttpEvent<unknown>)

      interceptor(req, nextHandler).subscribe({
        next: (evt: HttpEvent<unknown>) => {
          const headers = evt as unknown as HttpHeaders
          expect(headers.has('Authorize')).toBeFalsy()
        },
        error: () => fail('expected next to be called.')
      })
    })
  })
})

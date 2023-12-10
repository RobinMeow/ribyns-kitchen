import { TestBed } from '@angular/core/testing';
import {
  HttpEvent,
  HttpHandlerFn,
  HttpHeaders,
  HttpInterceptorFn,
  HttpRequest,
  provideHttpClient,
} from '@angular/common/http';

import { authInterceptor } from './auth.interceptor';
import { environment } from 'src/environments/environment';
import { of } from 'rxjs';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('authInterceptor should', () => {
  const interceptor: HttpInterceptorFn = (req, next) =>
    TestBed.runInInjectionContext(() => authInterceptor(req, next));

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
  });

  it('be created', () => {
    expect(interceptor).toBeTruthy();
  });

  it('append Authroize Header to API calls', () => {
    expect.assertions(2);
    const req = new HttpRequest('GET', environment.API_BASE_URL);
    expect(req.headers.has('Authorize')).toBeFalsy();

    const nextHandler: HttpHandlerFn = (req: HttpRequest<unknown>) =>
      of(req.headers as unknown as HttpEvent<unknown>);

    interceptor(req, nextHandler).subscribe((evt: HttpEvent<unknown>) => {
      const headers = evt as unknown as HttpHeaders;
      expect(headers.has('Authorize')).toBeTruthy();
    });
  });

  it.each([
    'http://example.com',
    'http://example.com?returnUrl=' + environment.API_BASE_URL,
  ])('not append Authroize Header to non API calls', (url) => {
    expect.assertions(2);
    const req = new HttpRequest('GET', url);
    expect(req.headers.has('Authorize')).toBeFalsy();

    const nextHandler: HttpHandlerFn = (req: HttpRequest<unknown>) =>
      of(req.headers as unknown as HttpEvent<unknown>);

    interceptor(req, nextHandler).subscribe((evt: HttpEvent<unknown>) => {
      const headers = evt as unknown as HttpHeaders;
      expect(headers.has('Authorize')).toBeFalsy();
    });
  });
});

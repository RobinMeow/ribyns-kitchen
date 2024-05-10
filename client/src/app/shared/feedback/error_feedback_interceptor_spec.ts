import { TestBed } from '@angular/core/testing'
import { HttpInterceptorFn } from '@angular/common/http'
import { errorFeedbackInterceptor } from './error_feedback_interceptor'

describe('errorFeedbackInterceptor should', () => {
  const interceptor: HttpInterceptorFn = (req, next) =>
    TestBed.runInInjectionContext(() => errorFeedbackInterceptor(req, next))

  beforeEach(() => {
    TestBed.configureTestingModule({})
  })

  it('be created', () => {
    expect(interceptor).toBeTruthy()
  })
})

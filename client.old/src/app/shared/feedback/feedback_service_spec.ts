import { TestBed } from '@angular/core/testing'

import { FeedbackService } from './feedback_service'

describe('FeedbackService should', () => {
  let service: FeedbackService

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(FeedbackService)
  })

  it('be created', () => {
    expect(service).toBeTruthy()
  })
})

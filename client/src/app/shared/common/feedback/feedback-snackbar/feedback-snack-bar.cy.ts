import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar'
import { FeedbackSnackBar } from './feedback-snack-bar'
import { FeedbackData } from '../FeedbackData'

describe('feedback snackbar component should', () => {
  beforeEach('mount', () => {
    cy.mount(FeedbackSnackBar, {
      providers: [
        { provide: MatSnackBarRef, useValue: null! },
        {
          provide: MAT_SNACK_BAR_DATA,
          useValue: { message: 'test message' } as FeedbackData
        }
      ]
    })
  })

  it('display the message', () => {
    cy.contains('test message')
  })
})

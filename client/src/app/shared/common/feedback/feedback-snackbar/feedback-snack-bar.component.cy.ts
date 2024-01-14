import {
  MAT_SNACK_BAR_DATA,
  MatSnackBarRef,
} from '@angular/material/snack-bar';
import { FeedbackSnackBarComponent } from './feedback-snack-bar.component';
import { FeedbackData } from '../FeedbackData';

describe('feedback snackbar component should', () => {
  beforeEach('mount', () => {
    cy.mount(FeedbackSnackBarComponent, {
      providers: [
        { provide: MatSnackBarRef, useValue: null! },
        {
          provide: MAT_SNACK_BAR_DATA,
          useValue: { message: 'test message' } as FeedbackData,
        },
      ],
    });
  });

  it('display the message', () => {
    cy.contains('test message');
  });
});

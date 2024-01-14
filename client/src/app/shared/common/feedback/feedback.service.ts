import { Injectable, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FeedbackSnackBarComponent } from './feedback-snackbar/feedback-snack-bar.component';
import { FeedbackData } from './FeedbackData';

@Injectable({
  providedIn: 'root',
})
export class FeedbackService {
  private readonly _snackBar = inject(MatSnackBar);

  show(message: string) {
    const feedbackMessage: FeedbackData = {
      message,
    };
    const threeSeconds = 3000;
    this._snackBar.openFromComponent(FeedbackSnackBarComponent, {
      duration: threeSeconds,
      verticalPosition: 'bottom',
      horizontalPosition: 'right',
      announcementMessage: 'announcementMessage',
      data: feedbackMessage,
    });
  }
}

import { Injectable, inject } from '@angular/core'
import { MatSnackBar } from '@angular/material/snack-bar'
import { FeedbackSnackBar } from './feedback-snackbar/feedback_snack_bar'
import { FeedbackData } from './feedback_data'

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  private readonly snackBar = inject(MatSnackBar)

  show(message: string) {
    const feedbackData: FeedbackData = {
      message
    }
    const threeSeconds = 3000
    this.snackBar.openFromComponent(FeedbackSnackBar, {
      duration: threeSeconds,
      verticalPosition: 'bottom',
      horizontalPosition: 'right',
      data: feedbackData
    })
  }
}

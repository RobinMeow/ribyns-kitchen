import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar'
import { FeedbackData } from '../feedback-data'

@Component({
  selector: 'common-feedback-snackbar',
  imports: [],
  templateUrl: './feedback.snack-bar.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeedbackSnackBar {
  protected readonly data = inject(MAT_SNACK_BAR_DATA) as FeedbackData
}

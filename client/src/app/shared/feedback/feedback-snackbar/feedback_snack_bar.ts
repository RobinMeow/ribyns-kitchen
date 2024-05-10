import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar'
import { FeedbackData } from '../feedback_data'

@Component({
  selector: 'common-feedback-snackbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './feedback_snack_bar.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeedbackSnackBar {
  protected readonly data = inject(MAT_SNACK_BAR_DATA) as FeedbackData
}

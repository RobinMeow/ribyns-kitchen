import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar'
import { FeedbackData } from '../FeedbackData'

@Component({
  selector: 'common-feedback-snackbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './feedback-snack-bar.html',
  styleUrl: './feedback-snack-bar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeedbackSnackBar {
  protected readonly snackBarRef = inject(MatSnackBarRef)
  protected readonly data: FeedbackData = inject(
    MAT_SNACK_BAR_DATA
  ) as FeedbackData
}

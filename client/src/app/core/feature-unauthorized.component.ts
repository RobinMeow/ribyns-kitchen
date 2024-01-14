import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'core-feature-unauthorized',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './feature-unauthorized.component.html',
  styleUrl: './feature-unauthorized.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeatureUnauthorizedComponent {

}

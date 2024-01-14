import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { APP_NAME } from 'src/app/core';

@Component({
  selector: 'core-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  protected readonly appName = inject(APP_NAME);
}

import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { APP_NAME } from 'src/app/core';

@Component({
  selector: 'core-home',
  standalone: true,
  templateUrl: './home.html',
  styleUrls: ['./home.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {
  protected readonly appName = inject(APP_NAME);
}

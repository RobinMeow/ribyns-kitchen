import { ChangeDetectionStrategy, Component } from '@angular/core';
import { applicationName } from 'src/globals';

@Component({
  selector: 'core-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  protected readonly applicationName = applicationName;
}

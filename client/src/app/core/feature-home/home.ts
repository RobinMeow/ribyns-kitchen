import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  standalone: true,
  templateUrl: './home.html',
  styleUrls: ['./home.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Home {}

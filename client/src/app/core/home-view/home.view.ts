import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  standalone: true,
  templateUrl: './home.view.html',
  styleUrls: ['./home.view.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeView {}

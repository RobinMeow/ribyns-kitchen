import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  templateUrl: './home.view.html',
  styleUrls: ['./home.view.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeView {}

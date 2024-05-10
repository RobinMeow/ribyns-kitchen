import { Component, viewChild } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { AsyncPipe } from '@angular/common'
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav'
import { Header, Menu } from 'src/app/core'

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrls: ['./app.scss'],
  standalone: true,
  imports: [AsyncPipe, RouterOutlet, MatSidenavModule, Menu, Header]
})
export class App {
  private readonly drawer = viewChild.required(MatDrawer)

  protected onOpenMenuClick() {
    this.drawer().open()
  }
}

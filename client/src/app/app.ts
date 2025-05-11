import { Component, viewChild } from '@angular/core'
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav'
import { RouterOutlet } from '@angular/router'
import { Header, Menu } from 'src/app/core'

@Component({
  selector: 'rk-app',
  templateUrl: './app.html',
  styleUrls: ['./app.scss'],
  imports: [RouterOutlet, MatSidenavModule, Menu, Header]
})
export class App {
  private readonly drawer = viewChild.required(MatDrawer)

  protected onOpenMenuClick() {
    void this.drawer().open()
  }
}

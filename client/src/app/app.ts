import { Component, computed, inject, viewChild } from '@angular/core'
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav'
import { RouterOutlet } from '@angular/router'
import { BreakpointObserver } from '@angular/cdk/layout'
import { Header, Menu } from 'src/app/core'
import { toSignal } from '@angular/core/rxjs-interop'

@Component({
  selector: 'rk-app',
  templateUrl: './app.html',
  styleUrls: ['./app.scss'],
  imports: [RouterOutlet, MatSidenavModule, Menu, Header]
})
export class App {
  private readonly drawer = viewChild.required(MatDrawer)
  private readonly breakpoints$ = inject(BreakpointObserver)

  private readonly maxWidth600 = toSignal(
    this.breakpoints$.observe('(max-width: 599.98px)')
  )

  protected readonly drawerMode = computed<'side' | 'over'>(() =>
    this.maxWidth600()?.matches ? 'over' : 'side'
  )

  protected onOpenMenuClick() {
    void this.drawer().open()
  }
}

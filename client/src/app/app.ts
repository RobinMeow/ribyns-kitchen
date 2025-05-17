import {
  Component,
  computed,
  effect,
  inject,
  untracked,
  viewChild
} from '@angular/core'
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav'
import { NavigationEnd, Router, RouterOutlet } from '@angular/router'
import { BreakpointObserver } from '@angular/cdk/layout'
import { Header, Menu } from 'src/app/core'
import { toSignal } from '@angular/core/rxjs-interop'
import { filter } from 'rxjs'

@Component({
  selector: 'rk-app',
  templateUrl: './app.html',
  styleUrls: ['./app.scss'],
  imports: [RouterOutlet, MatSidenavModule, Menu, Header]
})
export class App {
  private readonly drawer = viewChild.required(MatDrawer)
  private readonly breakpoints$ = inject(BreakpointObserver)
  private readonly router = inject(Router)

  private readonly maxWidth600 = toSignal(
    this.breakpoints$.observe('(max-width: 599.98px)')
  )

  protected readonly drawerMode = computed<'side' | 'over'>(() =>
    this.maxWidth600()?.matches ? 'over' : 'side'
  )

  private readonly navigationEnd = toSignal(
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd))
  )

  constructor() {
    effect(() => {
      // ensures, that the menu is closed on navigation for mobiles
      const isMobile = this.maxWidth600()?.matches ?? false
      if (this.navigationEnd() === undefined || !isMobile) return

      if (isMobile) void untracked(() => this.drawer()).close()
    })
  }

  protected onOpenMenuClick() {
    void this.drawer().open()
  }
}

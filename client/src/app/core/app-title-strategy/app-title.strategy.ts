import { Injectable, inject } from '@angular/core'
import { Title } from '@angular/platform-browser'
import { RouterStateSnapshot, TitleStrategy } from '@angular/router'

@Injectable({ providedIn: 'root' })
export class AppTitleStrategy extends TitleStrategy {
  private readonly title = inject(Title)

  override updateTitle(snapshot: RouterStateSnapshot): void {
    const title = this.buildTitle(snapshot)

    if (title !== undefined) this.title.setTitle(`${title} - Ribyn's Kitchen`)
    else this.title.setTitle("Ribyn's Kitchen")
  }
}

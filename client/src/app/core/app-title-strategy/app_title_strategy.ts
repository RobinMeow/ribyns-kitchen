import { Injectable, inject } from '@angular/core'
import { Title } from '@angular/platform-browser'
import { RouterStateSnapshot, TitleStrategy } from '@angular/router'
import { APP_NAME } from 'src/app/core'

@Injectable({
  providedIn: 'root'
})
export class AppTitleStrategy extends TitleStrategy {
  private readonly title = inject(Title)
  private readonly appName = inject(APP_NAME)

  override updateTitle(snapshot: RouterStateSnapshot): void {
    const title = this.buildTitle(snapshot)

    if (title !== undefined) {
      this.title.setTitle(`${title} - ${this.appName}`)
    } else {
      this.title.setTitle(this.appName)
    }
  }
}

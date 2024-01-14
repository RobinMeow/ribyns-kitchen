import { Injectable, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';
import { APP_NAME } from 'src/app/core';

@Injectable({
  providedIn: 'root',
})
export class AppTitleStrategy extends TitleStrategy {
  private readonly _title = inject(Title);
  private readonly _appName = inject(APP_NAME);

  override updateTitle(snapshot: RouterStateSnapshot): void {
    const title = this.buildTitle(snapshot);

    if (title !== undefined) {
      this._title.setTitle(`${title} - ${this._appName}`);
    } else {
      this._title.setTitle(this._appName);
    }
  }
}

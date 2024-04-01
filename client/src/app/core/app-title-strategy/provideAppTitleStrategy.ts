import { ClassProvider } from '@angular/core'
import { AppTitleStrategy } from './app-title.strategy'
import { TitleStrategy } from '@angular/router'

/** @__PURE__ */
export const provideAppTitleStrategy = function (): ClassProvider {
  return {
    provide: TitleStrategy,
    useClass: AppTitleStrategy
  }
}

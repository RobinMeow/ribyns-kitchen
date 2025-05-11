import { ClassProvider } from '@angular/core'
import { AppTitleStrategy } from './app-title-strategy/app-title.strategy'
import { TitleStrategy } from '@angular/router'

export const provideAppTitleStrategy = function (): ClassProvider {
  return {
    provide: TitleStrategy,
    useClass: AppTitleStrategy
  }
}

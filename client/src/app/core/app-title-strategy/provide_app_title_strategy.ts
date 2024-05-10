import { ClassProvider } from '@angular/core'
import { AppTitleStrategy } from './app_title_strategy'
import { TitleStrategy } from '@angular/router'

export const provideAppTitleStrategy = function (): ClassProvider {
  return {
    provide: TitleStrategy,
    useClass: AppTitleStrategy
  }
}

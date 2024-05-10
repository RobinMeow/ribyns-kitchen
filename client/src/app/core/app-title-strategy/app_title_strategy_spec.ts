import { TestBed } from '@angular/core/testing'

import { AppTitleStrategy } from './app_title_strategy'
import { RouterStateSnapshot } from '@angular/router'
import { Title } from '@angular/platform-browser'
import { APP_NAME, provideAppName } from 'src/app/core'

describe('AppTitleStrategyService should', () => {
  let strategy: AppTitleStrategy

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Title, provideAppName()]
    })
    strategy = TestBed.inject(AppTitleStrategy)
  })

  it('be created', () => {
    expect(strategy).toBeTruthy()
  })

  it('update title with application name', () => {
    const title = TestBed.inject(Title)
    const appName = TestBed.inject(APP_NAME)
    const setTitleSpy = spyOn(title, 'setTitle')

    const routerStateSnapshot = {} as RouterStateSnapshot

    strategy.updateTitle(routerStateSnapshot)

    expect(setTitleSpy).toHaveBeenCalledWith(jasmine.stringContaining(appName))
  })
})

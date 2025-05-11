import { TestBed } from '@angular/core/testing'
import { AppTitleStrategy } from './app-title.strategy'
import { RouterStateSnapshot } from '@angular/router'
import { Title } from '@angular/platform-browser'

describe('AppTitleStrategy should', () => {
  let strategy: AppTitleStrategy

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Title]
    })
    strategy = TestBed.inject(AppTitleStrategy)
  })

  it('be created', () => {
    expect(strategy).toBeTruthy()
  })

  it('update title with application name', () => {
    const title = TestBed.inject(Title)
    const setTitleSpy = spyOn(title, 'setTitle')

    const routerStateSnapshot = {} as RouterStateSnapshot

    strategy.updateTitle(routerStateSnapshot)

    expect(setTitleSpy).toHaveBeenCalledWith(jasmine.stringContaining('Ribyn'))
  })
})

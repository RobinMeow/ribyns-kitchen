import { ComponentFixture, TestBed } from '@angular/core/testing'
import { Header } from './header'
import { provideAppName } from 'src/app/core'
import { Router, provideRouter } from '@angular/router'
import { byTestAttr } from '@common/testing'

describe('Header should', () => {
  let component: Header
  let fixture: ComponentFixture<Header>

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [Header],
      providers: [provideAppName(), provideRouter([])]
    })
    fixture = TestBed.createComponent(Header)
    fixture.componentRef.setInput('hideMenuButton', true)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('create', () => {
    expect(component).toBeTruthy()
  })

  it('display menu button', () => {
    expect(byTestAttr(fixture, 'open-menu-button')).toBeTruthy()
  })

  it('hide menu button', () => {
    fixture.componentRef.setInput('hideMenuButton', false)
    fixture.detectChanges()
    const btn = byTestAttr<HTMLAnchorElement>(fixture, 'open-menu-button')
    expect(btn.querySelector('[hidden]')).toBeDefined()
  })

  it('render title', () => {
    const appTile = byTestAttr<HTMLAnchorElement>(fixture, 'app-title')
    expect(appTile).toBeTruthy()
  })

  it('navigate to home on title click', () => {
    const appTile = byTestAttr<HTMLAnchorElement>(fixture, 'app-title')
    expect(appTile).toBeTruthy()
    const router = TestBed.inject(Router)
    const spy = spyOn(router, 'navigateByUrl')
    appTile.click()
    expect(spy).toHaveBeenCalledOnceWith(jasmine.anything(), jasmine.anything())
  })

  it('have title with cursor pointer', () => {
    const appTile = byTestAttr<HTMLAnchorElement>(fixture, 'app-title')
    expect(getComputedStyle(appTile).cursor).toBe('pointer')
  })
})

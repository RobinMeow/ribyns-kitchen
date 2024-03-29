import { ComponentFixture, TestBed } from '@angular/core/testing'
import { Header } from './header'
import { provideAppName } from 'src/app/core'
import { Router, provideRouter } from '@angular/router'
import { queryByTestAttr } from '@testing'

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
    expect(queryByTestAttr(fixture, 'open-menu-button')).toBeTruthy()
  })

  it('hide menu button', () => {
    fixture.componentRef.setInput('hideMenuButton', false)
    fixture.detectChanges()
    const btn = queryByTestAttr<HTMLButtonElement>(fixture, 'open-menu-button')
    expect(btn.querySelector('[hidden]')).toBeDefined()
  })

  it('render title', () => {
    const appTile = queryByTestAttr<HTMLHeadElement>(fixture, 'app-title')
    expect(appTile).toBeTruthy()
  })

  it('navigate to home on title click', () => {
    const appTile = queryByTestAttr<HTMLButtonElement>(fixture, 'app-title')
    expect(appTile).toBeTruthy()
    const router = TestBed.inject(Router)
    const spy = spyOn(router, 'navigate')
    appTile.click()
    expect(spy).toHaveBeenCalledOnceWith([''])
  })
})

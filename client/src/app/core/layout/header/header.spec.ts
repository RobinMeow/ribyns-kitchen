import { ComponentFixture, TestBed } from '@angular/core/testing'
import { Header } from './header'
import { provideAppName } from 'src/app/core'
import { provideRouter } from '@angular/router'
import { queryByTestAttr } from '@testing'

describe('Header', () => {
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

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should display menu button', () => {
    expect(queryByTestAttr(fixture, 'open-menu-button')).toBeTruthy()
  })

  it('should hide menu button', () => {
    fixture.componentRef.setInput('hideMenuButton', false)
    fixture.detectChanges()
    const btn = queryByTestAttr<HTMLButtonElement>(fixture, 'open-menu-button')
    expect(btn.querySelector('[hidden]')).toBeDefined()
  })

  it('should render title', () => {
    expect(queryByTestAttr(fixture, 'app-title')).toBeTruthy()
  })
})

import { ComponentFixture, TestBed } from '@angular/core/testing'

import { Home } from './home'
import { provideAppName } from 'src/app/core'
import { byTestAttr } from '@common/testing'

describe('Home should', () => {
  let component: Home
  let fixture: ComponentFixture<Home>

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [Home],
      providers: [provideAppName()]
    })
    fixture = TestBed.createComponent(Home)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('create', () => {
    expect(component).toBeTruthy()
  })

  it('render home', () => {
    expect(byTestAttr(fixture, 'home')).toBeTruthy()
  })

  it('contain text', () => {
    expect(
      byTestAttr<HTMLElement>(fixture, 'home').innerText.length
    ).toBeGreaterThan(0)
  })
})

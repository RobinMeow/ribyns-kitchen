import { ComponentFixture, TestBed } from '@angular/core/testing'

import { HomeView } from './home.view'
import { byTestAttr } from '@common/testing'

describe('Home should', () => {
  let component: HomeView
  let fixture: ComponentFixture<HomeView>

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HomeView]
    })
    fixture = TestBed.createComponent(HomeView)
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

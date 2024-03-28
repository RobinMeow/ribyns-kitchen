import { ComponentFixture, TestBed } from '@angular/core/testing'
import { Header } from './header'
import { provideAppName } from 'src/app/core'
import { provideRouter } from '@angular/router'

describe('Header', () => {
  let component: Header
  let fixture: ComponentFixture<Header>

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [Header, provideRouter([])],
      providers: [provideAppName()]
    })
    fixture = TestBed.createComponent(Header)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})

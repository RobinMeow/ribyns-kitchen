import { ComponentFixture, TestBed } from '@angular/core/testing'
import { Menu } from './menu'
import { provideHttpClientTesting } from '@angular/common/http/testing'
import { provideHttpClient } from '@angular/common/http'
import { provideApiBaseUrlTesting } from '@api'
import { provideRouter } from '@angular/router'

describe('Menu', () => {
  let component: Menu
  let fixture: ComponentFixture<Menu>

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [Menu, provideRouter([])],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideApiBaseUrlTesting()
      ]
    })
    fixture = TestBed.createComponent(Menu)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})

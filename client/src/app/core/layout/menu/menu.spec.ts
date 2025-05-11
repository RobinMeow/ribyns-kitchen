import { ComponentFixture, TestBed } from '@angular/core/testing'
import { Menu } from './menu'
import { provideHttpClientTesting } from '@angular/common/http/testing'
import { provideHttpClient } from '@angular/common/http'
import { provideApiBaseUrlTesting } from '@api'
import { provideRouter } from '@angular/router'
import { byTestAttr } from '@common/testing'
import { MatDrawer } from '@angular/material/sidenav'

describe('Menu should', () => {
  let component: Menu
  let fixture: ComponentFixture<Menu>
  let drawerSpy: jasmine.SpyObj<MatDrawer>

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [Menu],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
        provideApiBaseUrlTesting()
      ]
    })
    fixture = TestBed.createComponent(Menu)
    drawerSpy = jasmine.createSpyObj('MatDrawer', ['toggle'])
    fixture.componentRef.setInput('drawer', drawerSpy)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('create', () => {
    expect(component).toBeTruthy()
  })

  it('render close-menu-button', () => {
    expect(byTestAttr(fixture, 'close-menu-button')).toBeTruthy()
  })

  it('render auth-corner', () => {
    expect(fixture.nativeElement.querySelector('auth-corner')).toBeTruthy()
  })

  it('toggle drawer on close-menu-button click', () => {
    byTestAttr<HTMLButtonElement>(fixture, 'close-menu-button').click()
    fixture.detectChanges()
    expect(drawerSpy.toggle).toHaveBeenCalledOnceWith()
  })
})

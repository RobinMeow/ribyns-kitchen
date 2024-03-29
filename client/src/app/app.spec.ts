import { TestBed } from '@angular/core/testing'
import { App } from './app'
import { provideHttpClientTesting } from '@angular/common/http/testing'
import { provideHttpClient } from '@angular/common/http'
import { Header, Menu, provideAppName } from 'src/app/core'
import { provideNoopAnimations } from '@angular/platform-browser/animations'
import { provideApiBaseUrlTesting } from './shared/api/provideApiBaseUrl'
import { provideRouter } from '@angular/router'
import { MockComponent } from 'ng-mocks'
import { MatDrawer } from '@angular/material/sidenav'
import { findComponent } from '@testing'

describe('App should', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App, MockComponent(Header)],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
        provideAppName(),
        provideNoopAnimations(),
        provideApiBaseUrlTesting()
      ]
    }).compileComponents()
  })

  it('create', () => {
    const fixture = TestBed.createComponent(App)
    const app = fixture.componentInstance
    expect(app).toBeTruthy()
  })

  it('contain core-menu', () => {
    const fixture = TestBed.createComponent(App)
    const element = fixture.nativeElement.querySelector('core-menu')
    expect(element).toBeTruthy()
  })

  it('contain core-header', () => {
    const fixture = TestBed.createComponent(App)
    fixture.detectChanges()
    const element = fixture.nativeElement.querySelector('core-header')
    expect(element).toBeTruthy()
  })

  it('contain router-outlet', () => {
    const fixture = TestBed.createComponent(App)
    fixture.detectChanges()
    const element = fixture.nativeElement.querySelector('router-outlet')
    expect(element).toBeTruthy()
  })

  it('have menu open by default', () => {
    const fixture = TestBed.createComponent(App)
    fixture.detectChanges()
    const coreMenu = fixture.nativeElement.querySelector('core-menu')
    expect(coreMenu.hidden).toBeFalse()
    expect(findComponent(fixture, Menu).drawer().opened).toBeTrue()
  })

  it('open menu onOpenMenuClick', () => {
    const fixture = TestBed.createComponent(App)
    fixture.detectChanges()

    const drawer: MatDrawer = findComponent(fixture, MatDrawer)
    expect(drawer.opened).toBeTrue()
    drawer.close()
    expect(drawer.opened).toBeFalse()

    const spy = spyOn(drawer, 'open').and.callThrough()

    const header = findComponent(fixture, Header)
    expect(header).toBeTruthy()

    header.openMenu.emit()

    expect(spy).toHaveBeenCalledOnceWith()
    expect(drawer.opened).toBeTrue()
  })
})

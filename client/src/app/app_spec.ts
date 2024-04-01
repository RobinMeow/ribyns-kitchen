import { ComponentFixture, TestBed } from '@angular/core/testing'
import { App } from './app'
import { provideHttpClientTesting } from '@angular/common/http/testing'
import { provideHttpClient } from '@angular/common/http'
import { Header, provideAppName } from 'src/app/core'
import { provideNoopAnimations } from '@angular/platform-browser/animations'
import { provideApiBaseUrlTesting } from './shared/api/provide_api_base_url_testing'
import { provideRouter } from '@angular/router'
import { MockComponent } from 'ng-mocks'
import { MatDrawer } from '@angular/material/sidenav'
import { findComponent } from '@common/testing'

describe('App should', () => {
  let fixture: ComponentFixture<App>
  let component: App

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
    fixture = TestBed.createComponent(App)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('create', () => {
    expect(component).toBeTruthy()
  })

  it('contain core-menu', () => {
    const element = fixture.nativeElement.querySelector('core-menu')
    expect(element).toBeTruthy()
  })

  it('contain core-header', () => {
    const element = fixture.nativeElement.querySelector('core-header')
    expect(element).toBeTruthy()
  })

  it('contain router-outlet', () => {
    const element = fixture.nativeElement.querySelector('router-outlet')
    expect(element).toBeTruthy()
  })

  it('have menu open by default', () => {
    const coreMenu = fixture.nativeElement.querySelector('core-menu')
    expect(coreMenu.hidden).toBeFalse()
    expect(findComponent(fixture, MatDrawer).opened).toBeTrue()
  })

  it('open the menu on openMenu event emission', () => {
    const drawer: MatDrawer = findComponent(fixture, MatDrawer)
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

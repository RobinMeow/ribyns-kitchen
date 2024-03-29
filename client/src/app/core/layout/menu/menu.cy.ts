import { provideHttpClient } from '@angular/common/http'
import { Menu } from './menu'
import { AuthService } from 'src/app/auth/utils/auth.service'
import { signal } from '@angular/core'
import { provideRouter } from '@angular/router'

describe('menu should', () => {
  beforeEach('mount', () => {
    cy.mount(Menu, {
      providers: [
        provideHttpClient(),
        provideRouter([]),
        {
          provide: AuthService,
          useValue: {
            isAuthorized() {
              return signal(undefined)
            }
          }
        }
      ]
    })
  })

  it('be visible', () => {
    cy.getByAttr('menu').should('be.visible')
  })

  it('have visible auth-corner', () => {
    cy.getByAttr('auth-corner').should('be.visible')
  })
})

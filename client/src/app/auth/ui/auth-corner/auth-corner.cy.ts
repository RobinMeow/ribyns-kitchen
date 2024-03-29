import { provideHttpClient } from '@angular/common/http'
import { AuthCorner } from './auth-corner'
import { provideNoopAnimations } from '@angular/platform-browser/animations'
import { AuthService } from '../../utils/auth.service'
import { signal } from '@angular/core'
import { provideRouter } from '@angular/router'

describe('auth-corner should', () => {
  beforeEach('mount', () => {
    cy.mount(AuthCorner, {
      providers: [
        provideNoopAnimations(),
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
    cy.getByAttr('auth-corner').should('be.visible')
  })

  it('contain register button with routerLink', () => {
    cy.getByAttr('register-button')
      .should('be.visible')
      .should('be.enabled')
      .should('have.attr', 'routerLink')
  })

  it('contain login button with routerLink', () => {
    cy.getByAttr('login-button')
      .should('be.visible')
      .should('be.enabled')
      .should('have.attr', 'routerLink')
  })
})

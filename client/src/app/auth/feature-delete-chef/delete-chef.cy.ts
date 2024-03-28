import { DeleteChef } from './delete-chef'
import { provideHttpClient } from '@angular/common/http'
import { provideNoopAnimations } from '@angular/platform-browser/animations'
import { AuthService } from '../utils/auth.service'
import { MockProvider } from 'ng-mocks'

describe('DeleteChef should', () => {
  beforeEach('mount', () => {
    cy.mount(DeleteChef, {
      providers: [
        provideNoopAnimations(),
        provideHttpClient(),
        MockProvider(AuthService)
      ]
    })
  })

  it('have visible title', () => {
    cy.getByAttr('title').should('be.visible')
  })

  it('have visible & disabled submit button', () => {
    cy.getByAttr('submit-btn').should('be.visible').should('be.disabled')
  })

  it('enabled submit button with a long enough password', () => {
    cy.getByAttr('password-input').type('meow')
    cy.getByAttr('submit-btn').should('be.enabled')
  })
})

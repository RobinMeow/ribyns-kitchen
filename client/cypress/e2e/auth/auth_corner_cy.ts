import { config } from '../config'

describe('auth-corner', () => {
  describe('wehn authorized should', () => {
    beforeEach(() => {
      cy.login()
      cy.visit('/')
    })

    it('contain logout button', () => {
      cy.login()
      cy.visit('/')

      cy.byTestAttr('logout-button')
        .should('be.visible')
        .invoke('text')
        .should('have.length.above', 1)
    })

    it('navigate to home on logout button click', () => {
      cy.byTestAttr('logout-button').click()
      cy.url().should('equal', config.hostUrl + '/')
      cy.byTestAttr('login-button').should('be.visible')
      cy.byTestAttr('register-button').should('be.visible')
    })
  })

  describe('wehn not authorized should', () => {
    beforeEach(() => {
      cy.visit('/')
    })

    it('navigate to login on login button click', () => {
      cy.byTestAttr('login-button').click()
      cy.url().should('not.include', 'register')
      cy.url().should('include', 'login')
    })

    it('navigate to register on register button click', () => {
      cy.byTestAttr('register-button').click()
      cy.url().should('not.include', 'login')
      cy.url().should('include', 'register')
    })
  })
})

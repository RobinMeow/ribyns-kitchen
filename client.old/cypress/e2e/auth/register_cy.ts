describe('register', () => {
  describe('when unauthorized should', () => {
    beforeEach(() => {
      cy.task('db:reset')
      cy.visit('/register')
    })

    it('not register with empty inputs', () => {
      cy.intercept(
        Cypress.env('apiBaseUrl') + '/Auth/RegisterAsync',
        cy.spy().as('register')
      )
      cy.byTestAttr('register-submit-button').click({ force: true })
      cy.url().should('include', 'register')
      cy.get('@register').should('not.have.been.called')
    })

    it('register with enter', () => {
      cy.byTestAttr('register-name-input').type('Cypress Testuser')
      cy.byTestAttr('password-input').type('iLoveJesus<3!{enter}')
    })

    it('register with submit button', () => {
      cy.byTestAttr('register-name-input').type('Cypress Testuser')
      cy.byTestAttr('password-input').type('iLoveJesus<3!{enter}')
      cy.byTestAttr('register-submit-button').click()
    })

    it('register with email', () => {
      cy.byTestAttr('register-name-input').type('Cypress Testuser')
      cy.byTestAttr('email-input').type('be.blessed@nd.loved')
      cy.byTestAttr('password-input').type('iLoveJesus<3!{enter}')
      cy.byTestAttr('register-submit-button').click()
    })
  })

  describe('when authorized should', () => {
    it('redirect', () => {
      cy.login()
      cy.visit('/register')
      cy.url().should('not.include', 'register')
    })
  })
})

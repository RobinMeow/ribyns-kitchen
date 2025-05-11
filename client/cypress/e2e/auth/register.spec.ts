describe('register', () => {
  it('should not send http request with empty inputs', () => {
    cy.visit('/register')
    cy.intercept(
      Cypress.env('apiBaseUrl') + '/Auth/RegisterAsync',
      cy.spy().as('register')
    )
    cy.byTestAttr('register-submit-button').click({ force: true })
    cy.url().should('include', 'register')
    cy.get('@register').should('not.have.been.called')
  })

  describe('when unauthorized should', () => {
    beforeEach(() => {
      cy.task('db:reset')
      cy.visit('/register')
    })

    it('register with enter', () => {
      cy.byTestAttr('register-name-input').type('Cypress Testuser')
      cy.byTestAttr('password-input').type('iLoveJesus<3!{enter}')
    })

    it('register with submit button', () => {
      cy.byTestAttr('register-name-input').type('Cypress Testuser')
      cy.byTestAttr('password-input').type('iLoveJesus<3!')
      cy.byTestAttr('register-submit-button').click()
    })

    it('register with email', () => {
      cy.byTestAttr('register-name-input').type('Cypress Testuser')
      cy.byTestAttr('email-input').type('be.blessed@nd.loved')
      cy.byTestAttr('password-input').type('iLoveJesus<3!{enter}')
    })
  })

  it('should redirect when authorized', () => {
    cy.auth('register-and-login')
    cy.visit('/register')
    cy.url().should('not.include', 'register')
  })
})

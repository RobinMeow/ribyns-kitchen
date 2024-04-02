describe('login', () => {
  describe('when unauthorized should', () => {
    beforeEach(() => {
      cy.task('db:reset')
      cy.visit('/login')
    })

    it('not log in with empty inputs', () => {
      cy.byTestAttr('login-submit-button').click({ force: true })
      cy.url().should('include', 'login')
    })

    it('work with enter', () => {
      cy.byTestAttr('login-name-input').type('Cypress Testuser')
      cy.byTestAttr('password-input').type('iLoveJesus<3!{enter}')
    })

    it('work with submit button', () => {
      cy.byTestAttr('login-name-input').type('Cypress Testuser')
      cy.byTestAttr('password-input').type('iLoveJesus<3!{enter}')
      cy.byTestAttr('login-submit-button').click()
    })
  })

  describe('when authorized should', () => {
    it('redirect', () => {
      cy.login()
      cy.visit('/login')
      cy.url().should('not.include', 'login')
    })
  })
})

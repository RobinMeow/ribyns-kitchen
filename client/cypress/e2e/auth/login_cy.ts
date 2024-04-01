describe('login should', () => {
  it('not log in with empty inputs', () => {
    cy.visit('/login')
    cy.byTestAttr('login-submit-button').click({ force: true })
    cy.url().should('include', 'login')
  })
})

describe('login redirects', () => {
  it('when logged in already', () => {
    cy.login()
    cy.visit('/login')
    cy.url().should('not.include', 'login')
  })
})

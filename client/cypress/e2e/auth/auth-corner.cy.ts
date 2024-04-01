describe('auth-corner should', () => {
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

  it('contain logout button', () => {
    cy.createTestUser()

    cy.byTestAttr('logout-button')
      .should('be.visible')
      .invoke('text')
      .should('have.length.above', 1)

    cy.deleteTestUser()
  })
})

describe('auth-corner should', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('navigate to login on login button click', () => {
    cy.getByAttr('login-button').click()
    cy.url().should('not.include', 'register')
    cy.url().should('include', 'login')
  })

  it('navigate to register on register button click', () => {
    cy.getByAttr('register-button').click()
    cy.url().should('not.include', 'login')
    cy.url().should('include', 'register')
  })

  it('contain logout button', () => {
    cy.createTestUser()

    cy.getByAttr('logout-button')
      .should('be.visible')
      .invoke('text')
      .should('have.length.above', 1)

    cy.deleteTestUser()
  })
})

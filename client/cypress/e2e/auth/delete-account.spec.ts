describe('delete-chef should', () => {
  it('redirect to home not authorized', () => {
    cy.visit('/delete-chef')
    cy.url().should('not.include', 'delete-chef')
  })

  it('validates incorrect password', () => {
    cy.auth('register-and-login')

    cy.visit('/delete-chef')
    cy.intercept('POST', '/Auth/DeleteAsync').as('deleteUserRequest')

    cy.byTestAttr('password-input').type('wrong-password{enter}')

    cy.wait('@deleteUserRequest').its('response.statusCode').should('eq', 400)
    cy.url().should('include', 'delete-chef')
  })
})

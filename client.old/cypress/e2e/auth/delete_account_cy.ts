describe('delete-chef should', () => {
  it('redirect to home', () => {
    cy.visit('/delete-chef')
    cy.url().should('not.include', 'delete-chef')
  })

  it('validates incorrect password', () => {
    cy.login()

    cy.visit('/delete-chef')

    cy.byTestAttr('password-input').type('wrong-password{enter}')

    cy.url().should('include', 'delete-chef')
  })
})

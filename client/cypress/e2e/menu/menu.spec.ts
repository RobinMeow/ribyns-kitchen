describe('menu should', () => {
  it('close on close-menu-button click', () => {
    cy.visit('/')
    cy.get('core-menu').as('menu').should('be.visible')
    cy.byTestAttr('close-menu-button').click()
    cy.get('@menu').should('not.be.visible')
  })
})

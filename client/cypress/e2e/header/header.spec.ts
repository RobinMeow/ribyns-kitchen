function getOpenMenuButton() {
  return cy.byTestAttr('open-menu-button')
}

describe('header should', () => {
  it('not have visible open-menu-button', () => {
    cy.visit('/')
    getOpenMenuButton().should('not.be.visible')
  })

  it('open the menu after it has been closed', () => {
    // Arrange
    cy.visit('/')
    cy.get('core-menu').as('menu').should('be.visible')
    cy.byTestAttr('close-menu-button').click()

    // Assert
    cy.get('@menu').should('not.be.visible')
    getOpenMenuButton().click()
    cy.get('@menu').should('be.visible')
  })

  // redirect
  it('redirect to home when app title is clicked', () => {
    cy.visit('/login')
    cy.byTestAttr('app-title').click()
    cy.url().should('not.include', 'login')
  })
})

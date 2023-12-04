describe('open menu button should', () => {
  it('not be visible', () => {
    cy.visit('/');
    cy.getByAttr('open-menu-button').should('not.be.visible');
  });

  it('open the menu after it has been closed', () => {
    cy.visit('/');
    cy.getByAttr('menu').should('be.visible');
    cy.getByAttr('close-menu-button').click();
    cy.getByAttr('menu').should('not.be.visible');
    cy.getByAttr('open-menu-button').click();
    cy.getByAttr('menu').should('be.visible');
  });
});

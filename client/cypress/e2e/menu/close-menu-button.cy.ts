describe('close menu button should', () => {
  it('be visible', () => {
    cy.visit('/');
    cy.getByAttr('close-menu-button').should('be.visible');
  });

  it('show the menu', () => {
    cy.visit('/');
    cy.getByAttr('menu').should('be.visible');
  });

  it('close the menu on click', () => {
    cy.visit('/');
    cy.getByAttr('close-menu-button').click();
  });

  it('not be visible after the menu has been closed', () => {
    cy.visit('/');
    cy.getByAttr('close-menu-button').click();
    cy.getByAttr('menu').should('not.be.visible');
  });
});

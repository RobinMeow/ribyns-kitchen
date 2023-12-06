describe('menu should', () => {
  it('close on close-menu-button click', () => {
    cy.visit('/');
    cy.getByAttr('menu').should('be.visible');
    cy.getByAttr('close-menu-button').click();
    cy.getByAttr('menu').should('not.be.visible');
  });
});

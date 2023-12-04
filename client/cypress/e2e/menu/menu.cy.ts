describe('menu should', () => {
  it('be visible', () => {
    cy.visit('/');
    cy.getByAttr('menu').should('be.visible');
  });

  it('have visible auth-corner', () => {
    cy.visit('auth-corner');
    cy.getByAttr('auth-corner').should('be.visible');
  });
});

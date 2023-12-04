describe('header should', () => {
  it('be visible', () => {
    cy.visit('/');
    cy.getByAttr('header').should('be.visible');
  });
});

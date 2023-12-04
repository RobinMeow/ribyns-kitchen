describe('home should', () => {
  it('be visible', () => {
    cy.visit('/');
    cy.getByAttr('home').should('be.visible');
  });
});

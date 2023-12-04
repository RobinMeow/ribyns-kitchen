describe('register should', () => {
  beforeEach(() => {
    cy.visit('/register');
  });

  it('have title', () => {
    cy.getByAttr('title').should('be.visible');
  });
});

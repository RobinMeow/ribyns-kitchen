describe('delete-account should', () => {
  it('redirect to home', () => {
    cy.visit('/delete-account');
    cy.url().should('not.include', 'delete-account');
  });
});

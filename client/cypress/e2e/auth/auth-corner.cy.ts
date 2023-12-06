it('contain login button with routerLink', () => {
  cy.createTestUser();

  cy.getByAttr('logout-button')
    .should('be.visible')
    .invoke('text')
    .should('have.length.above', 1);

  cy.deleteTestUser();
});

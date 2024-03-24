describe('create-recipe should', () => {
  it(`redirect to recipe/{id} after sucessfull created recipe`, () => {
    cy.createTestUser();

    cy.visit('/create-recipe');

    cy.getByAttr('recipe-title-input').type('My First Recipe');

    cy.getByAttr('create-recipe-submit-button').click();

    cy.url()
      .should('include', 'recipe/')
      .should(
        'have.length.gt',
        Cypress.config('baseUrl')!.length + '/recipe/'.length,
      );

    cy.deleteTestUser();
  });
});

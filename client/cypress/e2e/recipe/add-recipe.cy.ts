describe('add-recipe should', () => {
  it(`redirect to recipe/{id} recipe is created sucessfully`, () => {
    cy.createTestUser();

    cy.visit('/add-recipe');

    const recipeTitle = 'valid recipe title';

    cy.getByAttr('recipe-title-input').type(recipeTitle);

    cy.intercept({
      path: '/Recipe/AddAsync',
      times: 1,
    }).as('add-recipe');

    cy.getByAttr('add-recipe-submit-button').click();

    cy.wait('@add-recipe').then((stuff) => {
      const newRecipe: { id: string } = stuff.response?.body;
      cy.url().should('include', 'recipe/' + newRecipe.id);
    });

    cy.deleteTestUser();
  });
});

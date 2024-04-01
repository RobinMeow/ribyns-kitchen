describe('view-recipe should', () => {
  it(`redirect to recipe/{recipeId} recipe is created sucessfully`, () => {
    cy.task('db:reset')
    cy.task('db:seed:recipe')
    cy.login()
    const recipeTitle = 'Cypress Recipe'
    cy.visit('/recipe/2302dbb0-5269-4839-8bfa-b39e8c0b4821')
    cy.url().should('include', 'recipe/2302dbb0-5269-4839-8bfa-b39e8c0b4821')
    cy.byTestAttr('title').contains(recipeTitle)
  })
})

describe('view-recipe should', () => {
  it(`redirect to recipe/{recipeId} recipe is created sucessfully`, () => {
    const recipeId = crypto.randomUUID().toString()
    const title = 'Cypress Recipe'
    cy.task('db:reset')
    cy.task('db:seed:recipe', { id: recipeId, title: title })
    cy.login()
    cy.visit('/recipe/' + recipeId)
    cy.url().should('include', 'recipe/' + recipeId)
    cy.byTestAttr('title').contains(title)
  })
})

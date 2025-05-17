describe('view-recipe should', () => {
  it(`redirect to recipe/{recipeId} recipe is created sucessfully`, () => {
    const recipeId = crypto.randomUUID().toString()
    const name = 'Cypress Recipe'
    cy.wrap(cy.task('db:reset'))
      .then(() =>
        cy.wrap(
          cy.task('db:seed:recipe', {
            id: recipeId,
            name
          })
        )
      )
      .then(() => cy.wrap(cy.auth('register-and-login')))
      .then(() => {
        cy.visit('/recipe/' + recipeId)
        cy.url().should('include', 'recipe/' + recipeId)
        cy.byTestAttr('title').contains(name)
      })
  })
})

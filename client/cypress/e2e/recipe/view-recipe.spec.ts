describe('view-recipe should', () => {
  it(`redirect to recipe/{recipeId} recipe is created sucessfully`, async () => {
    const recipeId = crypto.randomUUID().toString()
    const name = 'Cypress Recipe'
    await (cy.task('db:reset') as unknown as Promise<null>)
    await (cy.task('db:seed:recipe', {
      id: recipeId,
      name
    }) as unknown as Promise<null>)
    await cy.auth('register-and-login')
    cy.visit('/recipe/' + recipeId)
    cy.url().should('include', 'recipe/' + recipeId)
    cy.byTestAttr('title').contains(name)
  })
})

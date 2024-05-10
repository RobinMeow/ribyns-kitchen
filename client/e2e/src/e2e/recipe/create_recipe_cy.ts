describe('create-recipe should', () => {
  it(`redirect to recipe/{recipeId} recipe is created sucessfully`, () => {
    cy.task('db:reset')
    cy.login()

    cy.visit('/create-recipe')

    const recipeTitle = 'valid recipe title'

    cy.byTestAttr('recipe-title-input').type(recipeTitle)

    cy.intercept({
      path: '/Recipe/AddAsync',
      times: 1
    }).as('create-recipe')

    cy.byTestAttr('create-recipe-submit-button').click()

    cy.wait('@create-recipe').then((stuff) => {
      const newRecipe: { id: string } = stuff.response?.body
      cy.url().should('include', 'recipe/' + newRecipe.id)
    })
  })
})

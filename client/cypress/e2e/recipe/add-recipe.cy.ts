describe('create-recipe should', () => {
  it(`redirect to recipe/{id} recipe is created sucessfully`, () => {
    cy.createTestUser()

    cy.visit('/create-recipe')

    const recipeTitle = 'valid recipe title'

    cy.getByAttr('recipe-title-input').type(recipeTitle)

    cy.intercept({
      path: '/Recipe/AddAsync',
      times: 1
    }).as('create-recipe')

    cy.getByAttr('create-recipe-submit-button').click()

    cy.wait('@create-recipe').then((stuff) => {
      const newRecipe: { id: string } = stuff.response?.body
      cy.url().should('include', 'recipe/' + newRecipe.id)
    })

    cy.deleteTestUser()
  })
})

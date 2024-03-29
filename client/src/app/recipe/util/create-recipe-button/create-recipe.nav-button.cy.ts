import { provideRouter } from '@angular/router'
import { CreateRecipeNavButton } from './create-recipe.nav-button'

describe('create-recipe-button should', () => {
  beforeEach('mount', () => {
    cy.mount(CreateRecipeNavButton, {
      providers: [provideRouter([])]
    })
  })

  it('be enabled', () => {
    cy.getByAttr('create-recipe-nav-button').should('be.enabled')
  })
})

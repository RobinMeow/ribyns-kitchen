import { provideRouter } from '@angular/router'
import { CreateRecipeMenuButton } from './create-recipe.menu-button'

describe('CreateRecipeMenuButton should', () => {
  beforeEach('mount', () => {
    cy.mount(CreateRecipeMenuButton, {
      providers: [provideRouter([])]
    })
  })

  it('be enabled', () => {
    cy.getByAttr('create-recipe-menu-button').should('be.enabled')
  })
})

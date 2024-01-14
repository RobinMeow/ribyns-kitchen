import { AddRecipeComponent } from './add-recipe.component';

describe('login should', () => {
  beforeEach('mount', () => {
    cy.mount(AddRecipeComponent, {
      providers: [],
    });
  });

  it('render', () => {
    cy.visit('/add-recipe');
  });
});

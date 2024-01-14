import { AddRecipeComponent } from './add-recipe.component';

describe('add-recipe should', () => {
  beforeEach('mount', () => {
    cy.mount(AddRecipeComponent, {
      providers: [],
    });
  });

  it('render', () => {
    cy.contains('add-recipe works!');
  });
});

import { ViewRecipe } from './view-recipe';

describe('recipe should', () => {
  beforeEach('mount', () => {
    cy.mount(ViewRecipe, {
      providers: [],
    });
  });
});

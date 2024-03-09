import { RecipeViewComponent } from './recipe-view.component';

describe('recipe should', () => {
  beforeEach('mount', () => {
    cy.mount(RecipeViewComponent, {
      providers: [],
    });
  });
});

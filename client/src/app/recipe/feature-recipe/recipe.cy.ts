import { Recipe } from './recipe';

describe('recipe should', () => {
  beforeEach('mount', () => {
    cy.mount(Recipe, {
      providers: [],
    });
  });
});

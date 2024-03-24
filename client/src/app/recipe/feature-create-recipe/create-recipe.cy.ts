import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { CreateRecipe } from './create-recipe';
import { RecipeApi } from '../api/recipe.api';

describe('create-recipe should', () => {
  beforeEach('mount', () => {
    cy.mount(CreateRecipe, {
      providers: [
        provideNoopAnimations(),
        provideHttpClient(),
        provideHttpClientTesting(),
        {
          provide: RecipeApi,
          useValue: {},
        },
      ],
    });
  });

  it('display the title input field', () => {
    cy.getByAttr('title').should('exist');
    cy.getByAttr('recipe-title-input').should('exist');
  });

  it('display the submit button', () => {
    cy.getByAttr('create-recipe-submit-button').should('exist');
  });

  it('have enabled submit button with valid form', () => {
    const title = 'New Recipe Title';

    cy.getByAttr('create-recipe-submit-button').as('btn').should('be.disabled');
    cy.getByAttr('recipe-title-input').type(title);
    cy.get('@btn').should('be.enabled');
  });
});

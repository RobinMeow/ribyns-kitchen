import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { AddRecipeComponent } from './add-recipe.component';
import { NewRecipeDto } from '@infrastructure/open-api';

describe('add-recipe should', () => {
  beforeEach('mount', () => {
    cy.mount(AddRecipeComponent, {
      providers: [
        provideNoopAnimations(),
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });
  });

  it('display the title input field', () => {
    cy.get('[data-cy-title]').should('exist');
    cy.get('[data-cy-recipe-title-input]').should('exist');
  });

  it('display the submit button', () => {
    cy.get('[data-cy-add-recipe-submit-button]').should('exist');
  });

  it('add a recipe when form is submitted with valid input', () => {
    const title = 'New Recipe Title';

    cy.get('[data-cy-recipe-title-input]').type(title);
    cy.get('[data-cy-add-recipe-submit-button]').click();

    cy.intercept(
      {
        path: 'Recipe/AddAsync',
        times: 1,
      },
      (req) => {
        const newRecipeDto = req.body as NewRecipeDto;
        expect(newRecipeDto.title).to.equal(title);
        req.reply({});
      },
    );
  });

  it('have disabled submit button, when input is invalid', () => {
    // leave input empty
    cy.get('[data-cy-add-recipe-submit-button]').should('be.disabled');
  });
});

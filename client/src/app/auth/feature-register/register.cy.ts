import { Register } from './register';
import { AuthService } from '../utils/auth.service';
import { provideHttpClient } from '@angular/common/http';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

describe('stubbed auth should', () => {
  beforeEach('mount', () => {
    cy.mount(Register, {
      providers: [
        provideNoopAnimations(),
        provideHttpClient(),
        {
          provide: AuthService,
          useValue: {},
        },
      ],
    });
  });

  it('have title', () => {
    cy.getByAttr('title').should('be.visible');
  });

  it('have disabled submit button', () => {
    cy.getByAttr('register-submit-button').should('be.disabled');
  });

  it('have enabled submit button after required fields are filled out', () => {
    cy.getByAttr('register-name-input').type('Weinberg des Herrn');
    cy.getByAttr('password-input').type('iLoveJesus<3');
    cy.getByAttr('register-submit-button').should('be.enabled');
  });

  it('have disabled submit button with any invalid field', () => {
    cy.getByAttr('register-submit-button')
      .as('submitBtn')
      .should('be.disabled');

    // valid data - enabled
    cy.getByAttr('register-name-input')
      .as('nameInput')
      .type('Weinberg des Herrn');
    cy.getByAttr('password-input').as('pwInput').type('iLoveJesus<3');
    cy.get('@submitBtn').should('be.enabled');

    // invalid email, disbled
    cy.getByAttr('email-input').as('emailInput').type('invalid');
    cy.get('@submitBtn').should('be.disabled');

    // valid email, enabled
    cy.get('@emailInput').type('be.blessed@nd.loved');
    cy.get('@submitBtn').should('be.enabled');

    // invalid name, disabled
    cy.get('@nameInput').clear();
    cy.get('@submitBtn').should('be.disabled');
    cy.get('@nameInput').type('Weinberg des Herrn');
    cy.get('@submitBtn').should('be.enabled');

    // invalid pw, disabled
    cy.get('@pwInput').clear();
    cy.get('@submitBtn').should('be.disabled');
  });
});

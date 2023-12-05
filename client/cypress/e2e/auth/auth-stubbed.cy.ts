import { config } from '../config';

function stubAuthRequests() {
  // stub 201 Created StatusCode
  cy.intercept(config.apiUrls.auth.registerAsync, {
    statusCode: 201,
  }).as('registerAsync');

  cy.intercept(config.apiUrls.auth.loginAsync, {
    statusCode: 200,
  }).as('loginAsync');
}

function fillOutForm() {
  cy.getByAttr('register-name-input').type('1234');
  cy.getByAttr('password-input').type('5678');
}

describe('stubbed auth should', () => {
  it('send form submit when enter is pressed in password input with valid data', () => {
    cy.visit('/register');

    stubAuthRequests();
    fillOutForm();
    cy.getByAttr('password-input').type('{enter}');

    cy.wait('@registerAsync');
    cy.wait('@loginAsync'); // redirects to home page

    cy.visit('/register');

    fillOutForm();
    cy.getByAttr('email-input').type('{enter}');

    cy.wait('@registerAsync');
    cy.wait('@loginAsync');

    // since we are not returning a valid JWT token in the loginAsync, this will not actualy log anyone in :)
  });
});

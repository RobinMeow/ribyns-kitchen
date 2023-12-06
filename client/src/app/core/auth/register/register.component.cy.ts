import { RegisterComponent } from './register.component';
import { AuthDomainService } from '../auth.domain.service';
import { provideHttpClient } from '@angular/common/http';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

function stubHttp() {
  // stub 201 Created StatusCode
  cy.intercept(
    {
      path: '/Auth/RegisterAsync',
      times: 2,
    },
    {
      statusCode: 201,
    },
  ).as('registerAsync');

  // stub 200 Ok
  cy.intercept(
    {
      path: '/Auth/LoginAsync',
      times: 2,
    },
    {
      statusCode: 200,
    },
  ).as('loginAsync');
}

describe('stubbed auth should', () => {
  beforeEach('mount', () => {
    cy.mount(RegisterComponent, {
      providers: [
        provideNoopAnimations(),
        provideHttpClient(),
        AuthDomainService,
      ],
    });
  });

  it('have title', () => {
    cy.getByAttr('title').should('be.visible');
  });

  it('send form submit when enter is pressed in password input with valid data', () => {
    stubHttp();
    cy.getByAttr('register-name-input').type('1234');
    cy.getByAttr('password-input').type('5678');
    cy.getByAttr('password-input').type('{enter}');

    cy.wait('@registerAsync');
    cy.wait('@loginAsync'); // would redirect to home page (if not component test)

    cy.getByAttr('email-input').type('{enter}');

    cy.wait('@registerAsync');
    cy.wait('@loginAsync');
    // since we are not returning a valid JWT token in the loginAsync, this will not actualy log anyone in :)
  });
});

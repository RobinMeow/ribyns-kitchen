import { provideHttpClient } from '@angular/common/http';
import { AuthCornerComponent } from './auth-corner.component';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { AuthDomainService } from '../../auth/auth.domain.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('auth-corner should', () => {
  beforeEach('mount', () => {
    cy.mount(AuthCornerComponent, {
      imports: [RouterTestingModule],
      providers: [
        provideNoopAnimations(),
        provideHttpClient(),
        AuthDomainService,
      ],
    });
  });

  it('be visible', () => {
    cy.getByAttr('auth-corner').should('be.visible');
  });

  it('contain register button with routerLink', () => {
    cy.getByAttr('register-button')
      .should('be.visible')
      .should('have.attr', 'routerLink');
  });

  it('contain login button with routerLink', () => {
    cy.getByAttr('login-button')
      .should('be.visible')
      .should('have.attr', 'routerLink');
  });
});

import { DeleteAccountComponent } from './delete-account.component';
import { AuthDomainService } from '../utils/auth.domain.service';
import { provideHttpClient } from '@angular/common/http';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

describe('login should', () => {
  beforeEach('mount', () => {
    cy.mount(DeleteAccountComponent, {
      providers: [
        provideNoopAnimations(),
        provideHttpClient(),
        AuthDomainService,
      ],
    });
  });

  it('have visible title', () => {
    cy.getByAttr('title').should('be.visible');
  });

  it('have visible & disabled submit button', () => {
    cy.getByAttr('submit-btn').should('be.visible').should('be.disabled');
  });

  it('enabled submit button with a long enough password', () => {
    cy.getByAttr('password-input').type('meow');
    cy.getByAttr('submit-btn').should('be.enabled');
  });
});

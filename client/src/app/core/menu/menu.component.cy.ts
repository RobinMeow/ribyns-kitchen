import { provideHttpClient } from '@angular/common/http';
import { AuthDomainService } from '../auth/auth.domain.service';
import { MenuComponent } from './menu.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('menu should', () => {
  beforeEach('mount', () => {
    cy.mount(MenuComponent, {
      imports: [RouterTestingModule],
      providers: [provideHttpClient(), AuthDomainService],
    });
  });

  it('be visible', () => {
    cy.getByAttr('menu').should('be.visible');
  });

  it('have visible auth-corner', () => {
    cy.getByAttr('auth-corner').should('be.visible');
  });
});

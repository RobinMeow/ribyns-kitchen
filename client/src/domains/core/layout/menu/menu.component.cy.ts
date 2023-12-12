import { provideHttpClient } from '@angular/common/http';
import { MenuComponent } from './menu.component';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from 'src/domains/auth/utils/auth.service';

describe('menu should', () => {
  beforeEach('mount', () => {
    cy.mount(MenuComponent, {
      imports: [RouterTestingModule],
      providers: [provideHttpClient(), AuthService],
    });
  });

  it('be visible', () => {
    cy.getByAttr('menu').should('be.visible');
  });

  it('have visible auth-corner', () => {
    cy.getByAttr('auth-corner').should('be.visible');
  });
});

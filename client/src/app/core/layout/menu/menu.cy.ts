import { provideHttpClient } from '@angular/common/http';
import { Menu } from './menu';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from 'src/app/auth/utils/auth.service';
import { signal } from '@angular/core';

describe('menu should', () => {
  beforeEach('mount', () => {
    cy.mount(Menu, {
      imports: [RouterTestingModule],
      providers: [
        provideHttpClient(),
        {
          provide: AuthService,
          useValue: {
            isAuthorized() {
              return signal(undefined);
            },
          },
        },
      ],
    });
  });

  it('be visible', () => {
    cy.getByAttr('menu').should('be.visible');
  });

  it('have visible auth-corner', () => {
    cy.getByAttr('auth-corner').should('be.visible');
  });
});

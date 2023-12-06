import { MenuComponent } from './menu.component';

describe('menu should', () => {
  beforeEach('mount', () => {
    cy.mount(MenuComponent);
  });

  it('be visible', () => {
    cy.getByAttr('menu').should('be.visible');
  });

  it('have visible auth-corner', () => {
    cy.getByAttr('auth-corner').should('be.visible');
  });
});

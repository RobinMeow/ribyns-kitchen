describe('auth-corner should', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.getByAttr('menu').as('menu');
  });

  it('have visible register button', () => {
    cy.get('@menu').getByAttr('register-button').should('be.visible');
  });

  it('have visible login button', () => {
    cy.get('@menu').getByAttr('login-button').should('be.visible');
  });

  it('navigate to login on login button click', () => {
    cy.get('@menu').getByAttr('login-button').click();
    cy.url().should('not.include', 'register');
    cy.url().should('include', 'login');
  });

  it('navigate to register on register button click', () => {
    cy.get('@menu').getByAttr('register-button').click();
    cy.url().should('not.include', 'login');
    cy.url().should('include', 'register');
  });
});

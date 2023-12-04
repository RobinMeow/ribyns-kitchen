describe('login should', () => {
  it('have title', () => {
    cy.visit('/login');
    cy.getByAttr('title').should('be.visible');
  });
  it('not log in with empty inputs', () => {
    cy.visit('/login');
    cy.getByAttr('login-submit-button').click({ force: true });
    cy.url().should('include', 'login');
  });
  it('have disabled submit button when inputs are empty', () => {
    cy.visit('/login');
    cy.getByAttr('login-submit-button').should('be.disabled');
    cy.getByAttr('login-name-input').type('Weinberg des Herrn');
    cy.getByAttr('password-input').type('iLoveJesus<3');
    cy.getByAttr('login-submit-button').should('be.enabled');
  });
});

describe('login redirects', () => {
  it('when logged in already', () => {
    cy.createTestUser();
    cy.visit('/login');
    cy.url().should('not.include', 'login');
    cy.deleteTestUser();
  });
});

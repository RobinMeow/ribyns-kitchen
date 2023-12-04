describe('auth should', () => {
  it('register > logout > login and delete', () => {
    // Register
    cy.visit('/register');
    const credentials = {
      chefname: 'Cypress-Register',
      password: 'iLoveJesus<3',
    };
    cy.getByAttr('register-submit-button').as('submit-btn');

    cy.get('@submit-btn').should('be.disabled');

    cy.getByAttr('register-name-input').type(credentials.chefname);
    cy.getByAttr('password-input').type(credentials.password);

    cy.get('@submit-btn').should('be.enabled');
    cy.get('@submit-btn').click(); // should redirect somewhere in success
    cy.url().should('not.include', 'register');
    cy.getByAttr('auth-corner')
      .getByAttr('logout-button')
      .contains('Ausloggen');

    // Logout
    cy.getByAttr('auth-corner').getByAttr('logout-button').click();

    // Login
    cy.visit('/login');
    cy.getByAttr('login-name-input').type(credentials.chefname);
    cy.getByAttr('password-input').type(credentials.password);
    cy.getByAttr('login-submit-button').click(); // should redirect somewhere in success
    cy.url().should('not.include', 'login');
    cy.getByAttr('auth-corner')
      .getByAttr('logout-button')
      .contains('Ausloggen');

    // Delete the just registered account
    cy.visit('/delete-account');
    cy.getByAttr('password-input').type(credentials.password);
    cy.getByAttr('delete-account-form').submit(); // redirect on success
    cy.url().should('not.include', 'delete-account');
    cy.getByAttr('auth-corner').getByAttr('login-button');
  });
});

import { config } from '../config';

describe('delete-account should', () => {
  it('redirect to home', () => {
    cy.visit('/delete-account');
    cy.url().should('not.include', 'delete-account');
  });

  it('validates incorrect chefname', () => {
    cy.createTestUser();

    cy.visit('/delete-account');

    cy.getByAttr('password-input').type('wrong-password{enter}');

    cy.url().should('include', 'delete-account');

    cy.deleteTestUser();
  });
});

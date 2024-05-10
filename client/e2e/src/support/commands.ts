/// <reference types="cypress" />
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/no-unused-vars */

// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace Cypress {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Chainable<Subject> {
    byTestAttr(
      selector: string,
      options?:
        | Partial<
            Cypress.Loggable &
              Cypress.Timeoutable &
              Cypress.Withinable &
              Cypress.Shadow
          >
        | undefined
    ): Cypress.Chainable<JQuery<HTMLElement>>

    /**
     * looks for en existing login token.
     * If none found, tries to register (+login).
     * If the Chefname already exists will do login with those creds.
     */
    login(): Promise<void>
  }
}

/**
 * @example
 * <button data-test-my-button></button>
 * Cy.getByDataCy('my-button').should.be('be.visivle');
 */
function byTestAttr(
  selector: string,
  options?:
    | Partial<
        Cypress.Loggable &
          Cypress.Timeoutable &
          Cypress.Withinable &
          Cypress.Shadow
      >
    | undefined
): Cypress.Chainable<JQuery<HTMLElement>> {
  return cy.get(`[data-test-${selector}]`)
}

Cypress.Commands.add('byTestAttr', byTestAttr)

Cypress.Commands.add('login', () => {
  const apiBaseUrl = Cypress.env('apiBaseUrl')

  cy.fixture('test-user.json').as('user')

  cy.get('@user').then(async (user) => {
    const { chefname, password }: any = user

    cy.request({
      method: 'POST',
      url: apiBaseUrl + '/Auth/RegisterAsync',
      body: JSON.stringify({
        name: chefname,
        password: password
      }),
      failOnStatusCode: false,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    }).then((response) => {
      if (!response.isOkStatusCode) {
        if (
          response.status !== 400 &&
          response.body !== 'Chefname ist bereits vergeben.'
        ) {
          throw new Error('Failed to login')
        }

        cy.log('Testuser already created.')
      }
    })

    cy.request({
      method: 'POST',
      url: apiBaseUrl + '/Auth/LoginAsync',
      body: JSON.stringify({
        name: chefname,
        password: password
      }),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    }).then((response) => {
      const token = response.body
      window.localStorage.setItem('token', token)
    })
  })
})

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/no-unused-vars */
// ***********************************************
// This example namespace declaration will help
// with Intellisense and code completion in your
// IDE or Text Editor.
// ***********************************************
// declare namespace Cypress {
//   interface Chainable<Subject = any> {
//     customCommand(param: any): typeof customCommand;
//   }
// }
//
// function customCommand(param: any): void {
//   console.warn(param);
// }
//
// NOTE: You can use it like so:
// Cypress.Commands.add('customCommand', customCommand);
//
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

declare namespace Cypress {
  interface Chainable<Subject = any> {
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

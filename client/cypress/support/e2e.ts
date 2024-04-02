import './commands'

// this looks hacky and wierd af! ... and it sure is!
//
// known bug since 2023 January (https://github.com/cypress-io/cypress/issues/25397)
// small reproduction done by some kind person: https://github.com/ZachJW34/cypress-request-visit-bug
//
// here the short explanation:
// after using cy.request() for login, cy.visit() does not function anymore as intended.
// this is a workaround to make, sure cy.visit() does function as intended.
fetch(Cypress.env('baseUrl'), { method: 'GET' }) // fire and forget

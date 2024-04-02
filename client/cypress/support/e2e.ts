import './commands'

// this looks hacky and wierd af!
// and it sure is!
// to spare you the time of reading the known bug (https://github.com/cypress-io/cypress/issues/25397)
// which wont get fixed.
// here the short explanation:
// after using cy.request() for login, cy.visit() does not function anymore as intended.
// thise is a workaround to make, sure cy.visit() does function as intended.
fetch(Cypress.env('baseUrl'), {
  method: 'GET'
}) // fire and forget

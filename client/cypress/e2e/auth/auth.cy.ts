describe('auth should', () => {
  it('register > logout > login and delete', () => {
    // Register
    cy.visit('/register')
    const credentials = {
      chefname: 'Cypress-Register',
      password: 'iLoveJesus<3'
    }
    cy.getByAttr('register-submit-button').as('submit-btn')

    cy.get('@submit-btn').should('be.disabled')

    cy.getByAttr('register-name-input').type(credentials.chefname)
    cy.getByAttr('password-input').type(credentials.password)

    cy.get('@submit-btn').should('be.enabled')
    cy.intercept({
      path: '/Auth/RegisterAsync',
      times: 1
    }).as('register-http-request')
    cy.get('@submit-btn').click() // should redirect somewhere in success
    cy.wait('@register-http-request')

    cy.url().should('not.include', 'register')
    cy.get('auth-corner')
      .as('authc')
      .getByAttr('logout-button')
      .contains('Ausloggen')

    // Logout
    cy.get('@authc').getByAttr('logout-button').click()

    // Login
    cy.visit('/login')
    cy.getByAttr('login-name-input').type(credentials.chefname)
    cy.getByAttr('password-input').type(credentials.password)
    cy.getByAttr('login-submit-button').click() // should redirect somewhere in success
    cy.url().should('not.include', 'login')
    cy.get('@authc').getByAttr('logout-button').contains('Ausloggen')

    // Delete the just registered account
    cy.visit('/delete-chef')
    cy.getByAttr('password-input').type(credentials.password)
    cy.intercept({
      path: '/Auth/DeleteAsync',
      times: 1
    }).as('delete-http-request')
    cy.getByAttr('delete-chef-form').submit() // redirect on success
    cy.wait('@delete-http-request')
    cy.url().should('not.include', 'delete-chef')
    cy.get('@authc').getByAttr('login-button')
  })
})

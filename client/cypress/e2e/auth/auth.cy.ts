describe('auth should', () => {
  it('register > logout > login and delete', () => {
    // Register
    cy.visit('/register')
    const credentials = {
      chefname: 'Cypress-Register',
      password: 'iLoveJesus<3'
    }
    cy.byTestAttr('register-submit-button').as('submit-btn')

    cy.get('@submit-btn').should('be.disabled')

    cy.byTestAttr('register-name-input').type(credentials.chefname)
    cy.byTestAttr('password-input').type(credentials.password)

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
      .byTestAttr('logout-button')
      .contains('Ausloggen')

    // Logout
    cy.get('@authc').byTestAttr('logout-button').click()

    // Login
    cy.visit('/login')
    cy.byTestAttr('login-name-input').type(credentials.chefname)
    cy.byTestAttr('password-input').type(credentials.password)
    cy.byTestAttr('login-submit-button').click() // should redirect somewhere in success
    cy.url().should('not.include', 'login')
    cy.get('@authc').byTestAttr('logout-button').contains('Ausloggen')

    // Delete the just registered account
    cy.visit('/delete-chef')
    cy.byTestAttr('password-input').type(credentials.password)
    cy.intercept({
      path: '/Auth/DeleteAsync',
      times: 1
    }).as('delete-http-request')
    cy.byTestAttr('delete-chef-form').submit() // redirect on success
    cy.wait('@delete-http-request')
    cy.url().should('not.include', 'delete-chef')
    cy.get('@authc').byTestAttr('login-button')
  })
})

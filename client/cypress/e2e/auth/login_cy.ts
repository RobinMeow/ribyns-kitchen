describe('login', () => {
  describe('when unauthorized should', () => {
    let user: { chefname: string; password: string }

    beforeEach(() => {
      cy.task('db:reset')
      cy.visit('/login')
      cy.fixture('test-user.json').then((usr) => (user = usr))
    })

    it('not log in with empty inputs', () => {
      cy.byTestAttr('login-submit-button').click({ force: true })
      cy.url().should('include', 'login')
    })

    it('work with enter', () => {
      cy.auth('register-only')
      cy.byTestAttr('login-name-input').type(user.chefname)
      cy.byTestAttr('password-input').type(`${user.password}{enter}`)
    })

    it('work with submit button', () => {
      cy.auth('register-only')
      cy.byTestAttr('login-name-input').type(user.chefname)
      cy.byTestAttr('password-input').type(user.password)
      cy.byTestAttr('login-submit-button').click()
    })
  })

  describe('when authorized should', () => {
    it('redirect', () => {
      cy.auth('register-and-login')
      cy.visit('/login')
      cy.url().should('not.include', 'login')
    })
  })
})

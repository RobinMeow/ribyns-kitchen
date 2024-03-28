it('render nothing apperently', () => {
  // no tests. Not sure if buggy, but App doesnt render anything.
  cy.get('[data-cy-root]').invoke('text').should('be.empty')
  // if this test fails, maybe there was an update, which allows App testing.
})

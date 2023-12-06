it('render nothing apperently', () => {
  // no tests. Not sure if buggy, but AppComponent doesnt render anything.
  cy.getByAttr('root').invoke('text').should('be.empty');
  // if this test fails, maybe there was an update, which allows AppComponent testing.
});

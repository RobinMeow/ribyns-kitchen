import { provideAppName } from 'src/app/core'
import { Home } from './home'

describe('home should', () => {
  beforeEach('mount', () => {
    cy.mount(Home, {
      providers: [provideAppName()]
    })
  })

  it('be visible', () => {
    cy.getByAttr('home').should('be.visible')
  })

  it('contain text', () => {
    cy.getByAttr('home').invoke('text').should('have.length.above', 1)
  })
})

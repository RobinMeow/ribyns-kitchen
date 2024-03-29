import { provideAppName } from 'src/app/core'
import { Header } from './header'
import { provideRouter } from '@angular/router'

describe('header should', () => {
  beforeEach('mount', () => {
    cy.mount(Header, {
      providers: [provideAppName(), provideRouter([])]
    })
  })

  it('be visible', () => {
    cy.getByAttr('header').should('be.visible')
  })

  it('contain menu button', () => {
    cy.getByAttr('open-menu-button').should('be.visible')
  })

  it('contain app title', () => {
    cy.getByAttr('app-title').should('be.visible')
  })

  it('have app title with routerLink', () => {
    cy.getByAttr('app-title').should('have.attr', 'routerLink')
  })
})

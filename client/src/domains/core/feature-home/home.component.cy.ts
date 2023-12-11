import { provideAppName } from '../provideAppName';
import { HomeComponent } from './home.component';

describe('home should', () => {
  beforeEach('mount', () => {
    cy.mount(HomeComponent, {
      providers: [provideAppName()],
    });
  });

  it('be visible', () => {
    cy.getByAttr('home').should('be.visible');
  });

  it('contain text', () => {
    cy.getByAttr('home').invoke('text').should('have.length.above', 1);
  });
});

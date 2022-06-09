context('Basic', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('view home & change lenguage', () => {
    cy.url()
      .should('eq', 'http://localhost:3333/')

    cy.contains('Rubén Ruiz Pedreira')
      .should('exist')

    cy.contains('Work')
      .should('exist')

    cy.get('[title="Change languages"]')
      .click()

    cy.contains('Trabajo')
      .should('exist')
  })

  it('about', () => {
    cy.get('[title="About"]')
      .click()
      .url()
      .should('eq', 'http://localhost:3333/about')

    cy.contains('About')
      .should('exist')

    cy.contains('Rubén Ruiz Pedreira')
      .should('exist')

    cy.contains('gherkin')
      .should('exist')
  })
})

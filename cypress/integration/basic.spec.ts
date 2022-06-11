context('Basic', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.url().should('eq', 'http://localhost:3333/')
  })

  it('view home & change lenguage', () => {
    cy.contains('Rubén Ruiz Pedreira')
      .should('exist')

    cy.contains('Work')
      .should('exist')

    cy.get('[title="Change languages"]')
      .click()

    cy.contains('Trabajo')
      .should('exist')
  })

  it('toggle dark mode', () => {
    cy.get('[title="Toggle dark mode"]').click()
  })

  it('visit about page', () => {
    cy.get('[title="About"]').click()
      .url().should('eq', 'http://localhost:3333/about')

    cy.contains('About')
      .should('exist')

    cy.contains('Rubén Ruiz Pedreira')
      .should('exist')

    cy.contains('gherkin')
      .should('exist')
  })

  it('visit github profile', () => {
    cy.get('[title="GitHub"]').click()
      .url().should('eq', 'http://localhost:3333/')
  })

  it('visit about page', () => {
    cy.get('[title="Services"]').click()
      .url().should('eq', 'http://localhost:3333/services')

    cy.contains('Services')
      .should('exist')
  })
})

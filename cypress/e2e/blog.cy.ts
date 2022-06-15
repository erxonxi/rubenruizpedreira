context('Blog', () => {
  beforeEach(() => {
    cy.visit('/')

    cy.url().should('eq', 'http://localhost:3333/')

    cy.get('[title="Blog"]').click()
      .url().should('eq', 'http://localhost:3333/blog')
  })

  it('view last post', () => {
    cy.get('a > h2').first().click()
      .url().should('contains', 'http://localhost:3333/blog/')

    cy.scrollTo('bottom')

    cy.contains('2022 by Rubén Ruiz Pedreira')
      .should('exist')
  })
})

context('Mobile Browsing', () => {
  beforeEach(() => {
    cy.viewport('samsung-s10')
    cy.visit('/')
  })

  it('visit blog & view last post', () => {
    cy.get('[title="Menu"]').click()

    cy.get('#menu-nav-bar > [title="Blog"]').click()
      .url().should('eq', 'http://localhost:3333/blog')

    cy.get('a > h2').first().click()
      .url().should('contains', 'http://localhost:3333/blog/')

    cy.scrollTo('bottom')

    cy.contains('2022 by Rubén Ruiz Pedreira')
      .should('exist')
  })

  it('vist about', () => {
    cy.get('[title="Menu"]').click()

    cy.get('#menu-nav-bar > [title="About"]').click()
      .url().should('eq', 'http://localhost:3333/about')
  })

  it('vist projects & view last project', () => {
    cy.get('[title="Menu"]').click()

    cy.get('#menu-nav-bar > [title="Projects"]').click()
      .url().should('eq', 'http://localhost:3333/projects')

    cy.get('a > h2').first().click()
      .url().should('contains', 'http://localhost:3333/projects/')

    cy.scrollTo('bottom', { ensureScrollable: false })

    cy.contains('2022 by Rubén Ruiz Pedreira')
      .should('exist')
  })
})

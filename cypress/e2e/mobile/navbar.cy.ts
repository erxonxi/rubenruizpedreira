context('GIVEN the user is on the mobile navbar', () => {
  beforeEach(() => {
    cy.viewport('samsung-s10');
    cy.visit('/');
  });

  context('WHEN the user clicks on the menu button', () => {
    beforeEach(() => {
      cy.get('[title="Menu"]').click();
    });

    it('THEN the menu should be visible', () => {
      cy.get('#menu-nav-bar').should('be.visible');
    });

    it('AND the blog link should be visible', () => {
      cy.get('#menu-nav-bar > [title="Blog"]').should('be.visible');
    });

    it('AND the services link should be visible', () => {
      cy.get('#menu-nav-bar > [title="Services"]').should('be.visible');
    });

    it('AND the about link should be visible', () => {
      cy.get('#menu-nav-bar > [title="About"]').should('be.visible');
    });

    it('AND the change idiom color be visible', () => {
      cy.get('[title="Change languages"]').should('be.visible');
    });

    it('AND the github link should be visible', () => {
      cy.get('[title="GitHub"]').should('be.visible');
    });

    it('AND the change theme button should be visible', () => {
      cy.get('[title="Toggle dark mode"]').should('be.visible');
    });
  });
});

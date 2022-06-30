context('GIVEN the user is in home and need open menu', () => {
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

    it('AND the projects link should be visible', () => {
      cy.get('#menu-nav-bar > [title="Projects"]').should('be.visible');
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

context('GIVEN the user is on the mobile navbar', () => {
  beforeEach(() => {
    cy.viewport('samsung-s10');
    cy.visit('/');

    cy.get('[title="Menu"]')
      .click();
  });

  context('WHEN the blog link is clicked', () => {
    beforeEach(() => {
      cy.get('#menu-nav-bar > [title="Blog"]').click();
    });

    it('THEN redirect user to /blog', () => {
      cy.url().should(
        'include',
        '/blog'
      );
    });
  });

  context('WHEN the projects link is clicked', () => {
    beforeEach(() => {
      cy.get('#menu-nav-bar > [title="Projects"]').click();
    });

    it('THEN redirect user to /projects', () => {
      cy.url().should(
        'include',
        '/projects'
      );
    });
  });

  context('WHEN the services link is clicked', () => {
    beforeEach(() => {
      cy.get('#menu-nav-bar > [title="Services"]').click();
    });

    it('THEN redirect user to /services', () => {
      cy.url().should(
        'include',
        '/services'
      );
    });
  });

  context('WHEN the about link is clicked', () => {
    beforeEach(() => {
      cy.get('#menu-nav-bar > [title="About"]').click();
    });

    it('THEN redirect user to /about', () => {
      cy.url().should(
        'include',
        '/about'
      );
    });
  });

  context('WHEN the change languages button is clicked', () => {
    beforeEach(() => {
      cy.get('[title="Change languages"]')
        .last()
        .click();
    });

    it('THEN the web change lenguage', () => {
      cy.contains('Trabajo')
        .should('exist');
    });
  });
});


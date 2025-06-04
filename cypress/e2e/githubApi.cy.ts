describe("GitHub API", () => {
  beforeEach(() => {
    cy.intercept("GET", "https://api.github.com/search/users?q=*", {
      statusCode: 200,
      body: {
        items: [{ id: 1, login: "ikeh", avatar_url: "https://avatar.url" }],
      },
    }).as("searchUsers");

    cy.intercept("GET", "https://api.github.com/users/ikeh/repos", {
      statusCode: 200,
      body: [
        {
          id: 1,
          name: "repo1",
          description: "Test repo",
          html_url: "https://github.com/repo1",
        },
      ],
    }).as("userRepos");
  });

  it("fetches users and displays them", () => {
    cy.visit("/");

    // Wait for input and button to be visible and enabled
    cy.get('input[placeholder="Search GitHub users..."]', { timeout: 10000 })
      .should("be.visible")
      .and("be.enabled");
    cy.get("button")
      .contains(/search/i, { timeout: 10000 })
      .should("be.visible")
    
      .then(($button) => {
        if (!$button.is(":enabled")) {
          console.log("Button is disabled, waiting for enablement");
          cy.get("button")
            .contains(/search/i)
            
        }
      });

    // Trigger the search
    cy.get('input[placeholder="Search GitHub users..."]').type("ikeh");
    cy.get("button")
      .contains(/search/i)
      .click()
      .then(() => {
        console.log("Search button clicked");
      });

    // Wait for the request

    cy.wait('@searchUsers', { timeout: 10000 }).then((interception) => {
      console.log('Intercepted request URL:', interception.request.url);
      console.log('Intercepted response statusCode:', interception.response?.statusCode);
      expect(interception.response?.statusCode).to.eq(200); // Ensure statusCode is checked
    });

    // Wait for and verify the UI update
    cy.contains("ikeh", { timeout: 10000 }).should("be.visible");
  });

  it("fetches user repositories and displays them", () => {
    cy.visit("/");

    cy.get('input[placeholder="Search GitHub users..."]').type("ikeh");
    cy.get("button")
      .contains(/search/i)
      .click();

    cy.wait("@searchUsers");
    cy.contains("ikeh", { timeout: 10000 }).click();

       cy.wait('@userRepos', { timeout: 10000 }).then((interception) => {
      console.log('Intercepted request URL:', interception.request.url);
      console.log('Intercepted response statusCode:', interception.response?.statusCode);
      expect(interception.response?.statusCode).to.eq(200);
    });

    cy.contains("repo1", { timeout: 10000 }).should("be.visible");
  });
});

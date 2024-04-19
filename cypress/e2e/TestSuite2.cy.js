/// <reference types="cypress" />

/* 
  Welcome QA candidate! Good luck in writing your test script! 
  You may structure or name your file however you see fit as this is just a template
*/

describe("Test Suite 2 - Popular Projects Links", () => {
  it('Test Case 1 - should verify that link "See All" under "Popular Projects" work as expected', () => {
    // Visit the page
    cy.visit('https://www.99.co/singapore');

    cy.contains('div._1__lJ', 'Popular projects').parent().within(() => {
      // Find all links within the section
      cy.get('a').each(link => {
        // Get the URL and text of each link
        const url = link.attr('href');
        const text = link.text().trim();

        // Test the link functionality
        if (url && url !== '#' && text) { // Exclude empty or placeholder links
          // Log the link text and URL for reference
          cy.log(`Verifying link: ${text} (${url})`);

          // Click the link and assert that it navigates to the expected destination
          cy.wrap(link).click();
          cy.url().should('include', url);
        }
      });
    });
  });

  it('Test Case 2 - should verify that all Projects Listing Card links under "Popular Projects" work as expected', () => {
    // Iterate through the first two project listing cards
    for (let i = 2; i <= 5; i++) {
    // Visit the page
    cy.visit('https://www.99.co/singapore');

    // Find elements with data-cy="projectsListingCard" within the current project listing card
      cy.get(`:nth-child(${i}) > [data-cy="projectsListingCard"]`).each(card => {
        // Find all links within the current project listing card
        cy.wrap(card).find('a').each(link => {
          // Get the URL and text of each link
          const url = link.attr('href');
          const text = link.text().trim();

          // Test the link functionality
          if (url && url !== '#' && text) { // Exclude empty or placeholder links
            // Log the link text and URL for reference
            cy.log(`Verifying link: ${text} (${url})`);

            // Click the link and assert that it navigates to the expected destination
            cy.wrap(link).click();
            cy.url().should('include', url);
          }
        });
      });
    }
  });
});

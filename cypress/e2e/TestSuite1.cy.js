/// <reference types="cypress" />

/* 
  Welcome QA candidate! Good luck in writing your test script! 
  You may structure or name your file however you see fit as this is just a template
*/

describe('Check Titles on Home Page', () => {
  it('Verifies the existence and text of specified titles', () => {
    // Visit the home page
    cy.visit('https://www.99.co/singapore');

    // Define an array of expected titles and their corresponding text
    const expectedTitles = [
      { selector: 'div._1__lJ', text: 'Featured projects' },
      { selector: 'div._1__lJ', text: 'Popular projects' },
      { selector: 'h2.yMCxv._3oF8R._1vzK2', text: 'Find your property value instantly' },
      { selector: 'div._1__lJ', text: 'Listings with videos' },
      { selector: 'div._1__lJ', text: 'Popular listings' },
      { selector: '.LyNqn > ._1__lJ', text: 'Featured stories' },
      { selector: 'div._1__lJ', text: 'Listings found only on 99' },
      { selector: 'h2.yMCxv.RNeWs._1vzK2', text: 'Latest New Launches' },
      { selector: 'h3._1zGm8.-YqBE._1TK5j', text: 'Explore 99.co' }
    ];

    // Iterate over each expected title and text
    expectedTitles.forEach(({ selector, text }) => {
      // Check if the element with the specified selector exists
      cy.get(selector).should('exist');

      // Check if the element contains the correct text
      cy.get(selector).should('contain', text);
    });
  });
});


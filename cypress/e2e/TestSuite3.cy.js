/// <reference types="cypress" />

/* 
  Welcome QA candidate! Good luck in writing your test script! 
  You may structure or name your file however you see fit as this is just a template
*/

describe("Filter Functionality Tests", () => {
  beforeEach(() => {
    cy.visit('https://www.99.co/singapore');
  });

  it('Filters by price range and verifies the result', () => {
    // Click on the Price Range dropdown
    cy.get('._2KYvl').contains('span', 'Price range').click();

    // Input the minimum price
    cy.get('input[name="price_min"]').clear().type('100000');

    // Input the maximum price
    cy.get('input[name="price_max"]').clear().type('2000000');

    // Click on the search button
    cy.get('[data-cy="search"]').click();

    // Wait for the filter results to load
    cy.get('li[itemprop="price"]').should('be.visible');

    // Get all the listing prices within the result
    cy.get('li[itemprop="price"]').should('be.visible').each(($listingPrice) => {
      const priceText = $listingPrice.text().replace('$', '').replace(/,/g, '');
      const price = parseFloat(priceText);
      
      // Verify that each price falls within the specified range
      expect(price).to.be.within(100000, 2000000);
    });
  });

  it('Filters by property type and verifies the result', () => {
    // Click on the Property Type dropdown
    cy.get('._2rxBL').contains('span', 'Property type').click();

    // Select a specific property type (e.g., "Condo")
    cy.get('._24tQT ul li').contains('Condo').click();

    // Click on the search button
    cy.get('[data-cy="search"]').click();

    // Wait for the filter results to load
    cy.get('[data-cy="listingName"]').should('be.visible');

    // Get all the listing property types within the result
    cy.get('[data-cy="listingName"]').should('be.visible').each(($listingName) => {
      // Verify that each listing item has the selected property type
      expect($listingName).to.contain('Condo');
    });
  });

  it('Filters by number of bedrooms and verifies the result', () => {
   // Click on the Bedrooms dropdown
   cy.get('div[role="button"]').contains('span', 'Bedrooms').click();

   // Wait for the dropdown options to appear
   cy.get('ul._17ZTv').should('be.visible');

   // Select a specific number of bedrooms (e.g., "3 Bedroom")
   cy.get('ul._17ZTv li').contains('3 Bedroom').click();

   // Click on the search button
   cy.get('[data-cy="search"]').click();

   // Get all the listing items within the result
   cy.get('li[itemprop="beds"]').should('be.visible').each(($beds) => {
     // Extract the number of bedrooms from the listing
     const bedrooms = parseInt($beds.text());
        
     // Ensure the number of bedrooms falls within the selected range (e.g., "3 Bedroom")
     expect(bedrooms).to.eq(3);
   });
  });

  it('Filters by rental type and verifies the result', () => {
    // Click on the "Rent" tab
    cy.get('label[for="search_category_rent"]').click();
    
    // Click on the Rental Type dropdown
    cy.get('div[role="button"]').contains('span', 'Rental type').click();
 
    // Select specific Rental Type options want to uncheck (e.g., "Master room")
    cy.get('ul._17ZTv li').contains('Master room').find('input[type="checkbox"]').uncheck({force: true});

    // Click on the search button
    cy.get('[data-cy="search"]').click();

    // Verify that the filter results match the selected Rental Type
    cy.get('[data-cy="listingCard"]').should('be.visible').each(listing => {
      cy.wrap(listing).should('not.contain', 'Master room');
    });
   });
});

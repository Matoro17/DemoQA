describe('template spec', () => {
  before(() => {
    // Handle uncaught exceptions from the application
    Cypress.on('uncaught:exception', (err) => {
      // Ignore cross-origin script errors
      if (err.message.includes('Script error')) {
        return false; // Prevent Cypress from failing the test
      }
    });
  });
  
  it('passes', () => {
    cy.visit('https://demoqa.com/')
  })
})
describe('Forms Section Tests', () => {
    beforeEach(() => {
      cy.visit('https://demoqa.com/automation-practice-form');
    });
  
    it('Submits valid practice form', () => {
      cy.get('#firstName').type('John');
      cy.get('#lastName').type('Doe');
      cy.get('#submit').click();
      cy.get('.modal-title').should('contain', 'Thanks for submitting');
    });
  
    it('Validates required fields', () => {
      cy.get('#submit').click();
      cy.get('.was-validated #firstName:invalid').should('exist');
    });
  });
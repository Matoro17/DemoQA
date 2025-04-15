// forms.cy.js
describe('Practice Form Tests', () => {
    beforeEach(() => {
      cy.visit('https://demoqa.com/automation-practice-form');
    });
  
    it('Successfully submits valid form', () => {
      // Personal Information
      cy.get('#firstName').type('John');
      cy.get('#lastName').type('Doe');
      cy.get('#userEmail').type('john.doe@example.com');
      
      // Gender
      cy.get('#gender-radio-1').check({ force: true });
      
      // Mobile
      cy.get('#userNumber').type('9876543210');
      
      // Date of Birth
      cy.get('#dateOfBirthInput').click()
        .type('{selectall}15 Apr 1990{enter}');
      
      // Subjects
      cy.get('#subjectsInput').type('Maths{enter}')
        .type('Physics{enter}');
      
      // Hobbies
      cy.get('#hobbies-checkbox-1').check({ force: true });
      cy.get('#hobbies-checkbox-3').check({ force: true });
      
      // Upload Picture
      cy.get('#uploadPicture').selectFile('cypress/fixtures/sample.jpg');
      
      // Address
      cy.get('#currentAddress').type('123 Main Street, Apt 4B');
      
      // State & City
      cy.get('#state').click().type('NCR{enter}');
      cy.get('#city').click().type('Delhi{enter}');
      
      // Submit
      cy.get('#submit').click();
      
      // Validation
      cy.get('.modal-title').should('contain', 'Thanks for submitting the form');
      cy.contains('td', 'Student Name').siblings().should('contain', 'John Doe');
      cy.contains('td', 'Mobile').siblings().should('contain', '9876543210');
    });
  
    it('Validates required fields', () => {
      cy.get('#submit').click();
      
      // Check validation messages
      cy.get('#firstName:invalid').should('exist');
      cy.get('#lastName:invalid').should('exist');
      cy.get('#userNumber:invalid').should('exist');
      
      // Custom validation for gender
      cy.get('#genterWrapper').should('have.class', 'was-validated');
    });
  
    it('Validates email format', () => {
      cy.get('#userEmail').type('invalid-email');
      cy.get('#submit').click();
      cy.get('#userEmail:invalid').should('exist');
    });
  
    it('Validates mobile number format', () => {
      cy.get('#userNumber').type('123');
      cy.get('#submit').click();
      cy.get('#userNumber:invalid').should('exist');
    });
  
    it('Handles maximum hobbies selection', () => {
      cy.get('#hobbies-checkbox-1').check({ force: true });
      cy.get('#hobbies-checkbox-2').check({ force: true });
      cy.get('#hobbies-checkbox-3').check({ force: true });
      
      cy.get('#hobbies-checkbox-1').should('be.checked');
      cy.get('#hobbies-checkbox-3').uncheck({ force: true });
      cy.get('#hobbies-checkbox-3').should('not.be.checked');
    });
  
    it('Validates state-city dependency', () => {
      cy.get('#state').click().type('Uttar Pradesh{enter}');
      cy.get('#city').click().type('Agra{enter}');
      cy.get('#city').should('contain', 'Agra');
    });
  });
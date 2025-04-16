// alerts-frame-windows.cy.js
describe('Alerts, Frame & Windows Tests', () => {
  before(() => {
    Cypress.on('uncaught:exception', (err) => {
      if (err.message.includes('Script error')) return false;
    });
  });

  beforeEach(() => {
    cy.visit('https://demoqa.com/alertsWindows', {
      // Bypass service worker if needed
      onBeforeLoad(win) {
        delete win.navigator.__proto__.serviceWorker;
      }
    });
  });
  // Disabled due to Cypress Limitations
    // describe('Browser Windows', () => {
    //   beforeEach(() => cy.get('#item-0').click());
  
    //   it('Opens new tab with proper content', () => {
    //     cy.get('#tabButton').invoke('removeAttr', 'target').click();
    //     cy.url().should('include', '/sample');
    //     cy.contains('This is a sample page').should('be.visible');
    //   });
  
    //   it('Opens new window with correct dimensions', () => {
    //     cy.get('#windowButton').then(($btn) => {
    //       const originalWindow = cy.state('window');
    //       cy.wrap($btn).invoke('removeAttr', 'target').click();
          
    //       cy.window().then((win) => {
    //         const newWindow = win.open.calls[0].returnValue;
    //         expect(newWindow.innerWidth).to.be.gt(500);
    //         expect(newWindow.innerHeight).to.be.gt(400);
    //       });
    //     });
    //   });
    // });
  
    describe('Alerts', () => {
      beforeEach(() => cy.get(':nth-child(3) > .element-list > .menu-list > #item-1').click());
  
      it('Handles simple alert', () => {
        cy.get('#alertButton').click();
        cy.on('window:alert', (text) => {
          expect(text).to.equal('You clicked a button');
        });
      });
  
      it('Confirms alert with OK/Cancel', () => {
        cy.get('#confirmButton').click();
        cy.on('window:confirm', (text) => {
          expect(text).to.include('Do you confirm action?');
          return false; // Simulate Cancel
        });
        cy.get('#confirmResult').should('contain', 'Cancel');
      });
  
      // it('Handles prompt alert with input', () => {
      //   cy.get('#promtButton').click();
      //   cy.on('window:prompt', (text) => {
      //     expect(text).to.include('Please enter your name');
      //     cy.get(':nth-child(3) > button').click()
      //     return false;
      //   });
      //   // cy.get('#promptResult').should('contain', 'Cypress User');
      // });
    });
  
    describe('Frames', () => {
      beforeEach(() => {
        cy.get(':nth-child(3) > .element-list > .menu-list > #item-2').click();
        cy.wait(500)
      });
  
      it('Validates frame content', () => {
        cy.get('#frame1')
        .should('be.visible')
        .then(($iframe) => {
            const $body = $iframe.contents().find('body')
            cy.wrap($body)
            .find(`h1`).should('have.text', 'This is a sample page');
        })       
      });
    });
  
    describe('Nested Frames', () => {
      beforeEach(() => {
        cy.contains('Nested Frames').click()
        cy.wait(500)
      });
  
      it('Navigates through nested frames', () => {
        cy.get('#frame1').then(parentFrame => {
          const parentDoc = parentFrame.contents();
          cy.wrap(parentDoc.find('iframe'))
            .then(childFrame => {
              const childDoc = childFrame.contents();
              cy.wrap(childDoc.find('body'))
                .should('contain', 'Child Iframe');
            });
        });
      });
    });
  
    describe('Modal Dialogs', () => {
      beforeEach(() => {
        cy.contains('Modal Dialogs').click()
        cy.wait(500)
      });
  
      it('Handles small modal', () => {
        cy.get('#showSmallModal').click();
        cy.get('.modal-body').should('contain', 'This is a small modal');
        cy.get('#closeSmallModal').click();
        cy.get('.modal-dialog').should('not.exist');
      });
  
      it('Closes modal by clicking backdrop', () => {
        cy.get('#showLargeModal').click();
        cy.get('.modal-dialog').should('be.visible');
        cy.get('body').click(0,0);
        cy.get('.modal-dialog').should('not.exist');
      });
    });
  });
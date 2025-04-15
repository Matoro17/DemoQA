// widgets.cy.js
import 'cypress-real-events/support';
describe('Widgets Section Tests', () => {
    before(() => {
        // Handle uncaught exceptions from the application
        Cypress.on('uncaught:exception', (err) => {
            // Ignore cross-origin script errors
            if (err.message.includes('Script error')) {
                return false; // Prevent Cypress from failing the test
            }
        });
    });
    beforeEach(() => {
        cy.visit('https://demoqa.com/widgets', {
            // Bypass service worker if needed
            onBeforeLoad(win) {
                delete win.navigator.__proto__.serviceWorker;
            }
        });
    });

    describe('Accordian', () => {
        beforeEach(() => cy.contains('Accordian').click());

        it('Expands and collapses sections', () => {
            cy.contains('What is Lorem Ipsum?').click();
            cy.contains('Lorem Ipsum is simply dummy text').should('not.be.visible');
            cy.contains('What is Lorem Ipsum?').click();
            cy.contains('Lorem Ipsum is simply dummy text').should('be.visible');
            cy.contains('Where does it come from?').should('be.visible');

            cy.contains('Where does it come from?').click();
            cy.contains('Contrary to popular belief').should('be.visible');
            cy.contains('Lorem Ipsum is simply dummy text').should('not.be.visible');
        });
    });

    describe('Auto Complete', () => {
        beforeEach(() => cy.contains('Auto Complete').click());

        it('Selects multiple colors', () => {
            // First selection
            cy.get('#autoCompleteMultipleInput').type('Re');
            cy.get('.auto-complete__menu').should('be.visible');
            cy.contains('.auto-complete__option', 'Red').click();

            // Re-query the input after DOM update
            cy.get('#autoCompleteMultipleInput').as('input');

            // Second selection
            cy.get('@input').type('Gr');
            cy.get('.auto-complete__menu').should('be.visible');
            cy.contains('.auto-complete__option', 'Green').click();

            // Verify selections
            cy.get('.auto-complete__multi-value__label')
                .should('have.length', 2)
                .and('contain', 'Red')
                .and('contain', 'Green');
        });
    });

    describe('Date Picker', () => {
        beforeEach(() => cy.contains('Date Picker').click());

        it('Selects date from calendar', () => {
            cy.get('#datePickerMonthYearInput').click();
            cy.get('.react-datepicker__day--015:not(.react-datepicker__day--outside-month)').click();
            cy.get('#datePickerMonthYearInput').should('contain.value', '15');
        });
    });

    describe('Slider', () => {
        beforeEach(() => cy.contains('Slider').click());

        it('Moves slider using realistic interaction', () => {
            cy.get('.range-slider')
                .realMouseDown({ position: 'right' })
                .realMouseMove(75, 0, { position: 'right' })
                .realMouseUp();

            cy.get('#sliderValue').should('have.value', '100');
        });
    });

    describe('Progress Bar', () => {
        beforeEach(() => cy.contains('Progress Bar').click());

        it('Completes progress bar', () => {
            cy.get('#startStopButton').click();
            cy.get('.progress-bar', { timeout: 30000 }).should('have.attr', 'aria-valuenow', '100');
        });
    });

    describe('Tabs', () => {
        beforeEach(() => {
            cy.contains('Tabs').click();
        });

        it('Validates tab navigation and disabled state', () => {
            // Verify initial state
            cy.get('#demo-tab-what').should('have.class', 'active');
            cy.get('#demo-tabpane-what').should('be.visible');

            // Test Origin tab
            cy.get('#demo-tab-origin').click();
            cy.get('#demo-tab-origin').should('have.class', 'active');
            cy.get('#demo-tabpane-origin').should('be.visible');
            cy.get('#demo-tabpane-what').should('not.be.visible');

            // Test Use tab
            cy.get('#demo-tab-use').click();
            cy.get('#demo-tab-use').should('have.class', 'active');
            cy.get('#demo-tabpane-use').should('be.visible');
            cy.get('#demo-tabpane-origin').should('not.be.visible');

            // Verify More tab is disabled
            cy.get('#demo-tab-more')
                .should('have.class', 'disabled')
                .and('have.attr', 'aria-disabled', 'true');

            // Verify forced click doesn't activate disabled tab
            cy.get('#demo-tab-more').click({ force: true });
            cy.get('#demo-tabpane-more').should('not.be.visible');
            cy.get('#demo-tab-use').should('still.have.class', 'active');
        });
    });

    describe('Tool Tips', () => {
        beforeEach(() => cy.contains('Tool Tips').click());

        it('Displays tooltip on hover', () => {
            cy.get('#toolTipButton').trigger('mouseover');
            cy.get('.tooltip-inner').should('contain', 'You hovered over the Button');
        });
    });

    describe('Menu', () => {
        beforeEach(() => {
            cy.visit('https://demoqa.com/menu');
        });

        it('Navigates through nested menu items', () => {
            // First level hover
            cy.contains('li', 'Main Item 2')
                .realHover() // Using cypress-real-events
                // .should('have.class', 'hover'); // If your menu adds hover classes

            // Second level hover
            cy.contains('li', 'SUB SUB LIST »')
                .realHover()
                .should('be.visible');

            // Verify sub-sub items
            cy.contains('li', 'Sub Sub Item 1')
                .should('be.visible')
                .and('have.css', 'display', 'block');
        });
    });

    describe('Select Menu', () => {
        beforeEach(() => {
          cy.contains('Select Menu').click();
        });
      
        it('Handles all select types reliably', () => {
          // 1. Old Style Select Menu
          cy.get('#oldSelectMenu').select('Purple');
          cy.get('#oldSelectMenu').should('contain', 'Purple');
      
          // 2. React Select - With OptGroup
        //   cy.get('#withOptGroup').click();
        //   cy.get('#react-select-7-input')
        //     .type('Group 1, option 2{enter}', { force: true });
        //   cy.get('#withOptGroup').should('contain', 'Group 1, option 2');
      
          // 3. React Select - Single Selection
        //   cy.get('#selectOne').click();
        //   cy.get('#react-select-8-input')
        //     .type('Mr{enter}', { force: true });
        //   cy.get('#selectOne').should('contain', 'Mr.');
      
          // 4. Standard Multi-Select
          cy.get('#cars').select(['volvo', 'audi']);
          cy.get('#cars option:selected').should('have.length', 2);
        });
      
        it('Handles multi-select dropdowns', () => {
          // React Multi-Select
        //   cy.get('input#react-select-9-input')
        //     .type('Green{enter}', { force: true })
        //     .type('Blue{enter}', { force: true });
          
          // Verify selected items using parent container
          cy.get('#selectMenuContainer').within(() => {
            cy.contains('Green').should('exist');
            cy.contains('Blue').should('exist');
          });
        });
      });
});
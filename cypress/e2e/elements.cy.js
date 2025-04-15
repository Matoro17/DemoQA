/// <reference types="cypress" />

describe('Elements Section Tests', () => {
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
        cy.visit('https://demoqa.com/elements', {
            // Bypass service worker if needed
            onBeforeLoad(win) {
                delete win.navigator.__proto__.serviceWorker;
            }
        });
    });

    describe('Text Box', () => {
        it('Submits valid text box data', () => {
            cy.contains('Text Box').click()
            cy.get('#userName').type('John Doe');
            cy.get('#userEmail').type('john@example.com');
            cy.get('#currentAddress').type('Cool Address');
            cy.get('#permanentAddress').type('Cool Address part 2');
            cy.get('#submit').click();
            cy.get('#output').should('contain', 'John Doe');
        });
    });

    describe('Check Box', () => {
        it('Expands and checks multiple items', () => {
            cy.contains('Check Box').click()
            cy.get('.rct-collapse-btn').click();
            cy.contains('Desktop').click();
            cy.contains('Downloads').click();
            cy.get('.text-success').should('have.length.at.least', 2);
        });


        describe('Radio Buttons', () => {
            it('Selects a radio button', () => {
                cy.contains('Radio Button').click()
                cy.get('#yesRadio').check({ force: true });
                cy.get('.text-success').should('contain', 'Yes');
            });
        });
    });

    describe('Web Tables', () => {
        beforeEach(() => cy.get('#item-3').click());

        it('Adds and deletes table entry', () => {
            cy.get('#addNewRecordButton').click();
            cy.get('#firstName').type('Test');
            cy.get('#lastName').type('Testable');
            cy.get('#userEmail').type('test@email.com');
            cy.get('#age').type('45');
            cy.get('#salary').type('650000');
            cy.get('#department').type('test')
            cy.get('#submit').click();
            cy.contains('.rt-td', 'Test').should('exist');
            cy.get('[title="Delete"]').last().click();
            cy.contains('.rt-td', 'Test').should('not.exist');
        });
    });

    describe('Buttons', () => {
        beforeEach(() => cy.get('#item-4').click());

        it('Handles different click types', () => {
            cy.get('#doubleClickBtn').dblclick();
            cy.get('#doubleClickMessage').should('be.visible');

            cy.get('#rightClickBtn').rightclick();
            cy.get('#rightClickMessage').should('exist');

            cy.get('button').eq(3).click({ force: true });
            cy.get('#dynamicClickMessage').should('exist');
        });
    });

    describe('Links', () => {
        beforeEach(() => {
            cy.visit('https://demoqa.com/links');
            cy.get('#item-5').click();
        });

        describe('Links opening new tabs', () => {
            it('Verifies simple link navigation', () => {
                cy.get('#simpleLink')
                    .should('have.attr', 'href', 'https://demoqa.com')
                    .and('have.attr', 'target', '_blank');

                // Alternative approach to verify navigation without leaving page
                cy.get('#simpleLink').then(link => {
                    cy.request(link.prop('href')).its('status').should('eq', 200);
                });
            });

            it('Validates dynamic link behavior', () => {
                cy.get('#dynamicLink')
                    .should('contain', 'Home')
                    .and('have.attr', 'href', 'https://demoqa.com');
            });
        });

        describe('API call links', () => {
            const statusCodes = {
                created: 201,
                'no-content': 204,
                moved: 301,
                'bad-request': 400,
                unauthorized: 401,
                forbidden: 403,
                'invalid-url': 404
            };

            Object.entries(statusCodes).forEach(([id, code]) => {
                it(`Handles ${id} API call (${code})`, () => {
                    // Intercept API call
                    cy.intercept('GET', `https://demoqa.com/${id}`).as('apiCall');

                    cy.get(`#${id}`).click();

                    // Verify network response
                    cy.wait('@apiCall').its('response.statusCode').should('eq', code);

                    // Verify UI feedback
                    cy.get('#linkResponse')
                        .should('be.visible')
                        .and('contain', `${code}`)
                        .and('contain', code === 201 ? 'Created' :
                            code === 204 ? 'No Content' :
                                code === 301 ? 'Moved' :
                                    code === 400 ? 'Bad Request' :
                                        code === 401 ? 'Unauthorized' :
                                            code === 403 ? 'Forbidden' : 'Not Found');
                });
            });
        });

        describe('Security validation', () => {
            it('Prevents invalid URL exploitation', () => {
                cy.get('#invalid-url').click();
                cy.get('#linkResponse')
                    .should('contain', '404')
                    .and('contain', 'Not Found');
            });
        });
    });

    describe('Broken Links - Images', () => {
        beforeEach(() => {
            cy.visit('https://demoqa.com/broken');
            cy.get('#item-6').click(); // Navigate to Broken Links section
        });

        it('Validates image states', () => {
            // Check valid image
            cy.get('img[src="/images/Toolsqa.jpg"]')
                .should('be.visible')
                .and(($img) => {
                    expect($img[0].naturalWidth).to.be.greaterThan(0);
                });

            // Check broken image
            cy.get('img[src="/images/Toolsqa_1.jpg"]')
                .should('be.visible')
                .and(($img) => {
                    expect($img[0].naturalWidth).to.equal(0);
                });
        });

        it('Verifies link behavior', () => {
            // Test valid link
            cy.get('a[href="http://demoqa.com"]')
                .should('contain', 'Valid Link')
                .then(($link) => {
                    cy.request($link.prop('href'))
                        .its('status')
                        .should('eq', 200);
                });

            // Test broken link
            cy.get('a[href="http://the-internet.herokuapp.com/status_codes/500"]')
                .should('contain', 'Broken Link')
                .then(($link) => {
                    cy.request({
                        url: $link.prop('href'),
                        failOnStatusCode: false
                    }).its('status').should('eq', 500);
                });
        });

        it('Handles unexpected redirects', () => {
            // Additional check for potential redirects
            cy.get('a[href="http://the-internet.herokuapp.com/status_codes/500"]')
                .then(($link) => {
                    cy.request({
                        url: $link.prop('href'),
                        followRedirect: false,
                        failOnStatusCode: false
                    }).its('status').should('eq', 500);
                });
        });
    });

    describe('Upload and Download', () => {
        beforeEach(() => cy.get('#item-7').click());

        it('Handles file operations', () => {
            // Upload
            cy.get('#uploadFile').selectFile('cypress/fixtures/example.json');
            cy.get('#uploadedFilePath').should('contain', 'example.json');

            // Download
            cy.get('#downloadButton').click();
            cy.readFile('cypress/downloads/sampleFile.jpeg').should('exist');
        });
    });

    describe('Dynamic Properties', () => {
        beforeEach(() => cy.get('#item-8').click());

        it('Handles dynamic elements', () => {
            // Enable after 5s button
            cy.get('#enableAfter', { timeout: 6000 }).should('be.enabled');

            // Color change validation
            cy.get('#colorChange')
                .should('have.css', 'color', 'rgb(220, 53, 69)'); // Red color
        });
    });
});
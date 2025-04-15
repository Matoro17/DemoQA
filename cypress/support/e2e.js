// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

// afterEach(function() {
//     if (this.currentTest.state === 'failed') {
//       const testTitle = this.currentTest.title.replace(/ /g, '-');
//       cy.screenshot(`FAILED-${testTitle}`, { overwrite: true });
      
//       // Attach screenshot to Mochawesome report
//       Cypress.runner.suite.suites
//         .find(s => s.title === this.currentTest.parent.title)
//         .tests.find(t => t.title === this.currentTest.title)
//         .context = `Screenshot: assets/screenshots/FAILED-${testTitle}.png`;
//     }
//   });
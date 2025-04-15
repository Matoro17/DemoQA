const { defineConfig } = require('cypress');

module.exports = defineConfig({
  screenshotsFolder: 'cypress/reports/screenshots',
  video: false,
  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: 'cypress/reports/mocha',
    overwrite: false,
    html: false,
    json: true,
    embeddedScreenshots: true, // Enable screenshot embedding
    screenshotOnRunFailure: true
  },
  e2e: {
    setupNodeEvents(on, config) {
      on('after:spec', (spec, results) => {
        if (results && results.stats.failures > 0) {
          // Attach screenshots to failed tests
          require('mochawesome/merge')(
            require('glob').sync('cypress/reports/mocha/*.json')
          );
        }
      });
    }
  }
});
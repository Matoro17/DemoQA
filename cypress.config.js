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
  env:{
    apiUrl: 'https://demoqa.com',
    token: 'YOUR_API_TOKEN' // Set via CI/CD or config
  },
  e2e: {
  }
});
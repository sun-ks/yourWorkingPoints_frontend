
module.exports = {
    type: 'module',
    testEnvironment: 'node',
    setupFiles: ['./jest.polyfills.js'],
    testEnvironmentOptions: {
        customExportConditions: [''],
      },
    // Other Jest configurations..
  };
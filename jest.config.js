module.exports = {
  testEnvironment: 'jsdom',
  setupFiles: ['./src/jest.polyfills.js'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  testEnvironmentOptions: {
    customExportConditions: [''],
  },
  globals: {
    'ts-jest': {
      tsconfig: './tsconfig.json', // Adjust the path accordingly
      transformerConfig: {
        transformIgnorePatterns: ['jest-runner'],
      },
    },
    
  },
  // Other Jest configurations..
};

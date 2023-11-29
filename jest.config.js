module.exports = {
  testEnvironment: 'jsdom',
  setupFiles: ['./src/jest.polyfills.js'],
  setupFilesAfterEnv: ['./src/setupTests.js'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  testEnvironmentOptions: {
    customExportConditions: [''],
  },
  globals: {
    'ts-jest': {
      tsconfig: './tsconfig.json',
      transformerConfig: {
        transformIgnorePatterns: ['jest-runner'],
      },
    },
  }
};

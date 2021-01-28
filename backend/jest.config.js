module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '.',
  collectCoverageFrom: ['src/**/*.ts', '!src/**/*.spec.ts'],
  testPathIgnorePatterns: ['<rootDir>/node_modules', '<rootDir>/dist'],
  testEnvironment: 'node',
  reporters: ['default', 'jest-sonar'],
  projects: [
    {
      displayName: 'unit',
      testRegex: 'src/.*\\.spec\\.ts$',
      transform: {
        '^.+\\.ts$': 'ts-jest',
      },
      setupFilesAfterEnv: ['<rootDir>/test/setup.ts'],
    },
    {
      displayName: 'e2e',
      testRegex: 'test/.*\\.e2e-spec\\.ts$',
      transform: {
        '^.+\\.ts$': 'ts-jest',
      },
      setupFilesAfterEnv: ['<rootDir>/test/setup.ts'],
    },
  ],
};

module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: 'src',
  collectCoverageFrom: ['src/**/*.(t|j)s'],
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
  projects: [
    {
      displayName: 'unit',
      testRegex: '.*\\.spec\\.ts$',
      transform: {
        '^.+\\.(t|j)s$': 'ts-jest',
      },
      setupFilesAfterEnv: ['<rootDir>/test/setup.ts'],
    },
    {
      displayName: 'e2e',
      testRegex: '.e2e-spec.ts$',
      transform: {
        '^.+\\.(t|j)s$': 'ts-jest',
      },
      setupFilesAfterEnv: ['<rootDir>/test/setup.ts'],
    },
  ],
};

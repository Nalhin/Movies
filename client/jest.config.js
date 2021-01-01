module.exports = {
  preset: 'jest-expo',
  collectCoverageFrom: ['src/**/*.(t|j)s(x)?'],
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|react-clone-referenced-element|@react-native-community|expo(nent)?|@expo(nent)?/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|@sentry/.*)',
  ],
  projects: [
    {
      preset: 'jest-expo/ios',
      setupFilesAfterEnv: ['<rootDir>/test/setup.ts'],
    },
    {
      preset: 'jest-expo/android',
      setupFilesAfterEnv: ['<rootDir>/test/setup.ts'],
    },
    {
      preset: 'jest-expo/web',
      setupFilesAfterEnv: ['<rootDir>/test/setup.ts'],
    },
  ],
};

module.exports = {
  preset: 'ts-jest',
  transform: {
    '^.+\\.tsx?$': ['ts-jest', { diagnostics: false, isolatedModules: true }],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
  testEnvironmentOptions: { node: true },
  setupFilesAfterEnv: ['./test/lib/setup.ts'],
  moduleNameMapper: { '^src/(.*)': '<rootDir>/src/$1' },
  modulePathIgnorePatterns: ['/dist/'],
};

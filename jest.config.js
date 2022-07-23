const ignorePatterns = ['node_modules/', 'dist/', 'coverage/']

module.exports = {
  preset: 'ts-jest',
  setupFilesAfterEnv: ['jest-extended/all'],
  maxWorkers: 1,
  passWithNoTests: true,
  testEnvironment: 'node',
  testMatch: ['<rootDir>/**/*.spec.ts', '<rootDir>/**/*.spec.tsx'],
  testPathIgnorePatterns: ignorePatterns,
  coverageDirectory: '<rootDir>/coverage',
  collectCoverageFrom: ['<rootDir>/**/*.ts', '<rootDir>/**/*.tsx'],
  coveragePathIgnorePatterns: ignorePatterns,
}

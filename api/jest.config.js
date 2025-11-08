module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/tests', '<rootDir>/utils'],
  testMatch: ['**/__tests__/**/*.test.ts', '**/?(*.)+(spec|test).ts', '**/?(*.)+(spec|test).js'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  collectCoverageFrom: [
    'utils/**/*.ts',
    'server.js',
    '!utils/**/*.d.ts',
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html'],
};

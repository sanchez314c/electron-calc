module.exports = {
    testEnvironment: 'node',
    setupFilesAfterEnv: ['<rootDir>/tests/setup.js'],
    collectCoverageFrom: [
        'src/**/*.js',
        'main.js',
        '!src/preload.js', // Exclude preload from coverage as it's hard to test
        '!**/node_modules/**'
    ],
    coverageDirectory: 'coverage',
    coverageReporters: [
        'text',
        'text-summary',
        'lcov',
        'html'
    ],
    coverageThreshold: {
        global: {
            branches: 70,
            functions: 70,
            lines: 70,
            statements: 70
        }
    },
    testMatch: [
        '<rootDir>/tests/**/*.test.js'
    ],
    verbose: true,
    testTimeout: 30000, // 30 seconds for Electron tests
    moduleFileExtensions: ['js', 'json'],
    transform: {},
    testPathIgnorePatterns: [
        '/node_modules/',
        '/dist/',
        '/build/'
    ]
};
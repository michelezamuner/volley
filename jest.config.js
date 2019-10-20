const config = {
    testEnvironment: 'node',
    verbose: true,
    roots: ['src', 'test'],
    moduleDirectories: ['lib'],
    collectCoverageFrom: ['src/**/*.js'],
    coverageDirectory: '/tmp',
    coveragePathIgnorePatterns: [
        // DTOs
        'RunSimulationResponse\.js',
        // Value objects
        'Frame\.js',
        // Factories
        'PhysicsFactory\.js',
        // Humble objects
        'ConsoleLogView\.js',
        // Wrappers of static types
        // Main
        'main/main\.js',
    ],
    coverageReporters: ['text'],
};

if (process.env.JEST_ENV === 'ci') {
    config.bail = true;
    config.verbose = false;
    config.coverageReporters = [];
    config.coverageThreshold = {
        global: {
            branches: 100,
            functions: 100,
            lines: 100,
            statements: 100,
        }
    };
}

module.exports = config;
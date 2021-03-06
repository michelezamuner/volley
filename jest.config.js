const config = {
    testEnvironment: 'node',
    verbose: true,
    roots: ['src', 'test'],
    moduleDirectories: ['lib'],
    collectCoverageFrom: ['src/**/*.js'],
    coverageDirectory: '/tmp',
    coveragePathIgnorePatterns: [
        // DTOs
        'RunSimulationRequest\.js',
        'RunSimulationResponse\.js',
        'Options\.js',
        'SceneViewModel\.js',
        // Value objects
        'Frame\.js',
        // Factories
        'PhysicsFactory\.js',
        'SimulationFactory\.js',
        // Humble objects
        'ConsoleLogView\.js',
        'ScreenView\.js',
        // Wrappers of static types
        'BlockingLoop\.js',
        'IntegratedLoop\.js',
        'WebLoop\.js',
        'SystemTime\.js',
        'WebTime\.js',
        'UrlSearchParams\.js',
        // Main
        'main\.js',
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
const SimulationService = require('../../../../../src/simulation-context/application/run-simulation-use-case/SimulationService');

test('makes ball fall and launches loop', () => {
    const ball = {};
    const factory = {
        create(mass, pos) {
            expect(mass).toBe(SimulationService.BALL_MASS);
            expect(pos).toBe(SimulationService.BALL_POS);

            return ball;
        }
    };
    const physics = {
        addBody: jest.fn(),
        applyForce: jest.fn(),
        processStep: jest.fn(),
    };
    const time = {
        SECOND: 0.002,
        now() {
            return 0;
        },
        loop(resolution, callback) {
            expect(resolution).toBe(SimulationService.RESOLUTION);
            callback(0.001);
            callback(0.002);
            callback(0.003);
            callback(0.004);
        }
    };

    const service = new SimulationService(factory, physics, time);
    const callback = jest.fn();
    service.run(callback);

    expect(physics.addBody).toBeCalledWith(ball);
    expect(physics.applyForce).toBeCalledWith(SimulationService.BALL_MASS * SimulationService.G);
    expect(physics.processStep).toBeCalledTimes(4);
    expect(physics.processStep).toBeCalledWith(SimulationService.RESOLUTION);
    expect(callback).toBeCalledTimes(2);
    expect(callback).toBeCalledWith(physics);
});
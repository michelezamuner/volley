const SimulationService = require('../../../../../src/simulation-context/application/run-simulation-use-case/SimulationService');

test('makes ball fall and launches loop', () => {
    const ball = {
        apply: jest.fn(),
    };
    const factory = {
        create(mass, pos) {
            expect(mass).toBe(SimulationService.BALL_MASS);
            expect(pos).toBe(SimulationService.BALL_POS);

            return ball;
        }
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

    const service = new SimulationService(factory, time);
    const callback = jest.fn();
    service.run(callback);

    const force = SimulationService.BALL_MASS * SimulationService.G;
    expect(ball.apply).toBeCalledTimes(4);
    expect(ball.apply).toBeCalledWith(force, SimulationService.RESOLUTION);
    expect(callback).toBeCalledTimes(2);
    expect(callback).toBeCalledWith(ball);
});
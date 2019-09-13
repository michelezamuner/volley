const SimulationService = require('../../../../../../src/simulation-context/application/simulation-port/run-simulation-use-case/SimulationService');

test('simulates ball falling', () => {
    const ball = {
        apply: jest.fn(),
    };
    const gravity = SimulationService.BALL_MASS * SimulationService.G;
    const factory = {
        create(mass, pos) {
            expect(mass).toBe(SimulationService.BALL_MASS);
            expect(pos).toBe(SimulationService.BALL_POS);

            return ball;
        }
    };
    let call = 0;
    const times = [0, 0.1234, 0.5434, 1.2234];
    const time = {
        start: jest.fn(),
        isRunning() { return call < times.length; },
        current() { return times[call++]; }
    };

    const service = new SimulationService(factory, time);
    const callback = jest.fn();
    service.run(callback);

    expect(time.start).toBeCalledTimes(1);
    expect(ball.apply).toBeCalledTimes(times.length);
    for (let i = 0; i < times.length; i++) {
        const diff = i === 0 ? 0 : times[i] - times[i - 1];
        expect(ball.apply).toHaveBeenNthCalledWith(i + 1, gravity, diff);
    }
    expect(callback).toBeCalledTimes(times.length);
    expect(callback).toBeCalledWith(ball);
});

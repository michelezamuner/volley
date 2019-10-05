const SimulationService = require('../../../../../../src/simulation-context/application/simulation-port/run-simulation-use-case/SimulationService');

test('simulates ball falling', () => {
    let applicationsCount = 0;
    const ball = {
        apply: jest.fn(() => applicationsCount++),
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
    let callbacksCount = 0;
    const callback = jest.fn(arg => {
        callbacksCount++;
        expect(arg).toBe(ball);
        expect(callbacksCount).toBe(applicationsCount + 1);
    });

    service.run(callback);

    expect(time.start).toBeCalledTimes(1);
    for (let i = 0; i < times.length; i++) {
        const diff = i === 0 ? 0 : times[i] - times[i - 1];
        expect(ball.apply).toHaveBeenNthCalledWith(i + 1, gravity, diff);
    }
});

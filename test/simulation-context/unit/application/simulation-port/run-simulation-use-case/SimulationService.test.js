const SimulationService = require('../../../../../../src/simulation-context/application/simulation-port/run-simulation-use-case/SimulationService');

test('simulates ball falling', () => {
    const mass = 12;
    const pos = 123;
    const conf = {
        getBallMass() { return mass; },
        getBallPos() { return pos; },
    };
    let applicationsCount = 0;
    const ball = {
        apply: jest.fn(() => applicationsCount++),
    };
    const gravity = mass * SimulationService.G;
    const factory = {
        create(mass, pos) {
            expect(mass).toBe(mass);
            expect(pos).toBe(pos);

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

    const service = new SimulationService(conf, factory, time);
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

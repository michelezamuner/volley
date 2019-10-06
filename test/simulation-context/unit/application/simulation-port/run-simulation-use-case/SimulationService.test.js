const SimulationService = require('../../../../../../src/simulation-context/application/simulation-port/run-simulation-use-case/SimulationService');
const Physics = require('../../../../../../src/simulation-context/domain/physics/Physics');

test('runs physics simulation without floor', () => {
    const ballMass = 12;
    const ballPos = 123;
    const conf = {
        getBallMass() { return ballMass; },
        getBallPos() { return ballPos; },
        getFloorPos() { return null; },
    };

    const gravity = ballMass * Physics.G;
    const ball = {};
    let resolutions = 0;
    const physics = {
        setField: jest.fn(),
        setBody: jest.fn(),
        resolve: jest.fn(() => resolutions++),
    };
    const factory = {
        createBody(mass, pos) {
            return mass === ballMass && pos === ballPos ? ball : null;
        },
        createPhysics() {
            return physics;
        },
    };

    let ticks = 0;
    const intervals = [0.1234, 0.5434, 1.2234];
    const time = {
        start: jest.fn(),
        isRunning() { return ticks < intervals.length; },
        tick() { return intervals[ticks++]; }
    };

    const service = new SimulationService(conf, factory, time);
    let callbacks = 0;
    const callback = jest.fn(arg => {
        callbacks++;
        expect(arg).toBe(ball);
        expect(callbacks).toBe(resolutions + 1);
    });

    service.run(callback);

    expect(physics.setField.mock.calls[0][0]).toBe(gravity);
    expect(physics.setBody.mock.calls[0][0]).toBe(ball);
    expect(time.start).toBeCalledTimes(1);
    for (const i in intervals) {
        expect(physics.resolve.mock.calls[i][0]).toBe(intervals[i]);
    }
});

test('runs physics simulation with floor', () => {
    const ballMass = 12;
    const ballPos = 123;
    const floorPos = 0;
    const conf = {
        getBallMass() {},
        getBallPos() {},
        getFloorPos() { return floorPos; },
    };

    const ball = {};
    const floor = {};
    let resolutions = 0;
    const physics = {
        setField: jest.fn(),
        setBody: jest.fn(),
        setConstraint: jest.fn(),
        resolve: jest.fn(() => resolutions++),
    };
    const factory = {
        createBody(mass, pos) {
            return mass === ballMass && pos === ballPos ? ball : null;
        },
        createConstraint(pos) {
            return pos === floorPos ? floor : null;
        },
        createPhysics() {
            return physics;
        },
    };

    let ticks = 0;
    const intervals = [0.1234, 0.5434, 1.2234];
    const time = {
        start: jest.fn(),
        isRunning() { return ticks < intervals.length; },
        tick() { return intervals[ticks++]; }
    };

    const service = new SimulationService(conf, factory, time);
    
    service.run(/* callback: */() => {});

    expect(physics.setConstraint.mock.calls[0][0]).toBe(floor);
    expect(time.start).toBeCalledTimes(1);
    for (const i in intervals) {
        expect(physics.resolve.mock.calls[i][0]).toBe(intervals[i]);
    }
});

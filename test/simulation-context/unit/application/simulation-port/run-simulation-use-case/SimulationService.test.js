const SimulationService = require('../../../../../../src/simulation-context/application/simulation-port/run-simulation-use-case/SimulationService');
const Constant = require('../../../../../../src/simulation-context/domain/physics/Constant');

/**
 * @var {Number}
 */
const ballMass = 12;

/**
 * @var {Number}
 */
const ballPos = 123;

/**
 * @var {Object|SimulationContext.Application.ConfigurationPort.Configuration}
 */
const conf = {
    getBallMass() { return ballMass; },
    getBallPos() { return ballPos; },
    getFloorPos() { return null; },
    getAirViscosity() { return null; },
};

/**
 * @var {Object|SimulationContext.Domain.Physics.Body}
 */
const ball = {};

/**
 * @var {Object|SimulationContext.Domain.Physics.Physics}
 */
const physics = {
    addBody(mass, pos) {
        return mass === ballMass && pos === ballPos ? ball : null;
    },
    addField: jest.fn(),
    addConstraint: jest.fn(),
    addDrag: jest.fn(),
};

/**
 * @var {null|Number}
 */
let resolutions = null;

/**
 * @var {null|Number}
 */
let ticks = null;

/**
 * @var {Array}
 */
const intervals = [0.1234, 0.5434, 1.2234];

/**
 * @var {Object|SimulationContext.Domain.Physics.Time}
 */
const time = {
    isRunning() { return ticks < intervals.length; },
    tick() { return intervals[ticks++]; }
};

/**
 * @var {null|Function}
 */
let callback = null;

/**
 * @var {null|SimulationContext.Application.SimulationPort.RunSimulationUseCase.SimulationService}
 */
let service = null;

beforeEach(() => {
    resolutions = 0;
    ticks = 0;
    physics.resolve = jest.fn(() => resolutions++);
    time.start = jest.fn();
    callback = jest.fn(arg => {
        expect(arg).toBe(ball);
    });

    service = new SimulationService(conf, physics, time);
});

afterEach(() => {
    expect(time.start).toBeCalledTimes(1);
    expect(callback).toBeCalledTimes(resolutions);
    for (const i in intervals) {
        expect(physics.resolve.mock.calls[i][0]).toBe(intervals[i]);
    }
});

test('runs basic physics simulation', () => {
    service.run(callback);

    expect(physics.addField.mock.calls[0][0]).toBe(-ballMass * Constant.G);
});

test('runs physics simulation with floor', () => {
    const floorPos = 0;
    conf.getFloorPos = () => floorPos;

    service.run(callback);

    expect(physics.addConstraint.mock.calls[0][0]).toBe(floorPos);
});

test('runs physics simulation with air friction', () => {
    const airViscosity = 0.5;
    conf.getAirViscosity = () => airViscosity;

    service.run(callback);

    expect(physics.addDrag.mock.calls[0][0]).toBe(airViscosity);
});

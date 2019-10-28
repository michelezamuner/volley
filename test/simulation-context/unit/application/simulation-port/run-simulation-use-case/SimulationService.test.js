const SimulationService = require('../../../../../../src/simulation-context/application/simulation-port/run-simulation-use-case/SimulationService');
const Frame = require('../../../../../../src/simulation-context/application/simulation-port/run-simulation-use-case/Frame');
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
const conf = {};

/**
 * @var {Object|SimulationContext.Domain.Physics.Body}
 */
const ball = {
    getPosition() { return ballPos; },
};

/**
 * @var {Object|SimulationContext.Domain.Physics.Physics}
 */
const physics = {
    addBody(mass, elasticity, pos) {
        return mass === ballMass && elasticity === conf.getBallElasticity() && pos === ballPos  ? ball : null;
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
 * @var {Object|SimulationContext.Application.LoopPort.Loop}
 */
const loop = {
    run(callback) {
        while (ticks < intervals.length) {
            callback();
        }
    }
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
    conf.getBallMass = () => ballMass;
    conf.getBallPos = () => ballPos;
    conf.getBallElasticity = () => null;
    conf.getFloorPos = () => null;
    conf.getAirViscosity = () => null;
    physics.resolve = jest.fn(() => resolutions++);
    time.start = jest.fn();
    callback = jest.fn(arg => {
        expect(arg).toEqual(new Frame(ballPos));
    });

    service = new SimulationService(conf, physics, time, loop);
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

test('runs physics simulation with floor and elasticity', () => {
    const pos = 0;
    const elasticity = 0.5;
    conf.getFloorPos = () => pos;
    conf.getBallElasticity = () => elasticity;
    callback = jest.fn(arg => {
        expect(arg).toEqual(new Frame(ballPos, pos));
    });

    service.run(callback);

    expect(physics.addConstraint.mock.calls[0][0]).toBe(pos);
});

test('runs physics simulation with air friction', () => {
    const airViscosity = 0.5;
    conf.getAirViscosity = () => airViscosity;

    service.run(callback);

    expect(physics.addDrag.mock.calls[0][0]).toBe(airViscosity);
});

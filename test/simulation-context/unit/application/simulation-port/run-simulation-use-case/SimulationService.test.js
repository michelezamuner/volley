const SimulationService = require('../../../../../../src/simulation-context/application/simulation-port/run-simulation-use-case/SimulationService');
const Physics = require('../../../../../../src/simulation-context/domain/physics/Physics');

/**
 * @var {Number}
 */
const ballMass = 12;

/**
 * @var {Number}
 */
const ballPos = 123;

/**
 * @var {Number}
 */
const gravity = ballMass * Physics.G;

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
    setField: jest.fn(),
    setBody: jest.fn(),
    setConstraint: jest.fn(),
    setDrag: jest.fn(),
};

/**
 * @var {Object|SimulationContext.Domain.Physics.PhysicsFactory}
 */
const factory = {
    createBody(mass, pos) {
        return mass === ballMass && pos === ballPos ? ball : null;
    },
    createPhysics() {
        return physics;
    }
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
 * @var {null|Number}
 */
let callbacks = null;

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
    callbacks = 0;
    physics.resolve = jest.fn(() => resolutions++);
    time.start = jest.fn();
    callback = jest.fn(arg => {
        callbacks++;
        expect(arg).toBe(ball);
        expect(callbacks).toBe(resolutions + 1);
    });

    service = new SimulationService(conf, factory, time);
});

afterEach(() => {
    expect(time.start).toBeCalledTimes(1);
    for (const i in intervals) {
        expect(physics.resolve.mock.calls[i][0]).toBe(intervals[i]);
    }
});

test('runs basic physics simulation', () => {
    service.run(callback);

    expect(physics.setField.mock.calls[0][0]).toBe(gravity);
    expect(physics.setBody.mock.calls[0][0]).toBe(ball);
});

test('runs physics simulation with floor', () => {
    const floorPos = 0;
    conf.getFloorPos = () => floorPos;

    const floor = {};
    factory.createConstraint = pos => pos === floorPos ? floor : null;
    
    service.run(callback);

    expect(physics.setConstraint.mock.calls[0][0]).toBe(floor);
});

test('runs physics simulation with air friction', () => {
    const airViscosity = 0.5;
    conf.getAirViscosity = () => airViscosity;

    const drag = {};
    factory.createDrag = viscosity => viscosity === airViscosity ? drag : null;

    service.run(callback);

    expect(physics.setDrag.mock.calls[0][0]).toBe(drag);
});

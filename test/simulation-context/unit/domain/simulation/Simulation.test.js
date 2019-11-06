const Simulation = require('../../../../../src/simulation-context/domain/simulation/Simulation');

/**
 * @var {Object|SimulationContext.Domain.Simulation.Options}
 */
const options = {};

/**
 * @var {Object|SimulationContext.Domain.Physics.Physics}
 */
const physics = {};

beforeEach(() => {
    options.getBallMass = () => null;
    options.getBallPosition = () => null;
    options.getBallElasticity = () => null;
    options.getFloorPosition = () => null;
    options.getAirViscosity = () => null;

    physics.addBody = jest.fn();
    physics.addField = jest.fn();
    physics.addConstraint = jest.fn();
    physics.addDrag = jest.fn();
    physics.resolve = jest.fn();
});

test('updates basic simulation', () => {
    const ballMass = 5;
    const ballPos = 10;
    const interval = 0.1234;

    options.getBallMass = () => ballMass;
    options.getBallPosition = () => ballPos;

    const simulation = new Simulation(options, physics);
    
    expect(physics.addBody.mock.calls[0][0]).toBe(ballMass);
    expect(physics.addBody.mock.calls[0][1]).toBe(null);
    expect(physics.addBody.mock.calls[0][2]).toBe(ballPos);
    expect(physics.addField.mock.calls[0][0]).toBe(-1 * ballMass * 9.8066);
    expect(physics.addConstraint).not.toBeCalled();

    simulation.update(interval);

    expect(physics.resolve.mock.calls[0][0]).toBe(interval);
});

test('must have ball options', () => {
    expect(() => new Simulation(options, physics)).toThrow('Missing required options');
});

test('provides current ball position', () => {
    const ballPosition = 10;
    const ball = {
        getPosition() { return ballPosition; },
    };

    options.getBallMass = () => 5;
    options.getBallPosition = () => 10;
    physics.addBody = () => ball;

    const simulation = new Simulation(options, physics);

    expect(simulation.getBallPosition()).toBe(ballPosition);
});

test('updates simulation with floor and elasticity', () => {
    const ballElasticity = 0.5;
    const floorPos = 0;

    options.getBallMass = () => 5;
    options.getBallPosition = () => 10;
    options.getBallElasticity = () => ballElasticity;
    options.getFloorPosition = () => floorPos;

    new Simulation(options, physics);

    expect(physics.addBody.mock.calls[0][1]).toBe(ballElasticity);
    expect(physics.addConstraint.mock.calls[0][0]).toBe(floorPos);
});

test('updates simulation with air friction', () => {
    const airViscosity = 0.5;

    options.getBallMass = () => 5;
    options.getBallPosition = () => 10;
    options.getAirViscosity = () => airViscosity;

    new Simulation(options, physics);

    expect(physics.addDrag.mock.calls[0][0]).toBe(airViscosity);
});
const Physics = require('../../../../../src/simulation-context/domain/physics/Physics');

/**
 * @var {Number}
 */
const interval = 0.1;

/**
 * @var {Number}
 */
const field = 5;

/**
 * @var {Object|SimulationContext.Domain.Physics.Body}
 */
const body = {};

/**
 * @var {null|SimulationContext.Domain.Physics.Physics}
 */
let physics = null;

beforeEach(() => {
    body.apply = jest.fn();
    body.resolve = jest.fn();

    physics = new Physics();
    physics.setField(field);
    physics.setBody(body);
});

afterEach(() => {
    expect(body.apply.mock.calls[0][0]).toBe(field);
    expect(body.resolve.mock.calls[0][0]).toBe(interval);
});

test('resolves body with field and constraint', () => {
    const constraint = {
        apply: jest.fn(),
    };

    physics.setConstraint(constraint);
    physics.resolve(interval);

    expect(constraint.apply.mock.calls[0][0]).toBe(body);
    expect(constraint.apply.mock.calls[0][1]).toBe(interval);
});

test('resolves body with field and drag', () => {
    const drag = {
        apply: jest.fn(),
    };

    physics.setDrag(drag);
    physics.resolve(interval);

    expect(drag.apply.mock.calls[0][0]).toBe(body);
});
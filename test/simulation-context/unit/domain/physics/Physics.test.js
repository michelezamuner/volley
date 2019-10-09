const Physics = require('../../../../../src/simulation-context/domain/physics/Physics');
const Constant = require('../../../../../src/simulation-context/domain/physics/Constant');

// /**
//  * @var {Number}
//  */
// const interval = 0.1;

// /**
//  * @var {Number}
//  */
// const field = 5;

// /**
//  * @var {Object|SimulationContext.Domain.Physics.Body}
//  */
// const body = {};

// /**
//  * @var {Object|SimulationContext.Domain.Physics.ActionableBody}
//  */
// const actionableBody = {};

/**
 * @var {Number}
 */
const interval = 0.5;

/**
 * @var {Number}
 */
const bodyMass = 5;

/**
 * @var {Number}
 */
const bodyPos = 10;

/**
 * @var {Object|SimulationContext.Domain.Physics.ActionableBody}
 */
const body = {};

/**
 * @var {Object|SimulationContext.Domain.Physics.PhysicsFactory}
 */
const factory = {
    createBody(mass, pos) {
        return mass === bodyMass && pos === bodyPos ? body : null;
    }
};

/**
 * @var {null|SimulationContext.Domain.Physics.Physics}
 */
let physics = null;

beforeEach(() => {
    body.resolve = jest.fn();
    physics = new Physics(factory);
});

test('returns added body', () => {
    expect(physics.addBody(bodyMass, bodyPos)).toBe(body);
});

test('resolves body with field', () => {
    const fieldForce = bodyMass * Constant.G;
    const field = {
        apply: jest.fn(),
    };
    factory.createField = force => force === fieldForce ? field : null;

    physics.addBody(bodyMass, bodyPos);
    physics.addField(fieldForce);
    physics.resolve(interval);

    expect(field.apply.mock.calls[0][0]).toBe(body); 
    expect(body.resolve.mock.calls[0][0]).toBe(interval);
});

test('resolves body with constraint', () => {
    const constraintPos = 0;
    const constraint = {
        apply: jest.fn(),
    };
    factory.createConstraint = pos => pos === constraintPos ? constraint : null;

    physics.addBody(bodyMass, bodyPos);
    physics.addConstraint(constraintPos);
    physics.resolve(interval);

    expect(constraint.apply.mock.calls[0][0]).toBe(body);
    expect(constraint.apply.mock.calls[0][1]).toBe(interval);
    expect(body.resolve.mock.calls[0][0]).toBe(interval);
});

test('resolves body with drag', () => {
    const dragViscosity = 0.5;
    const drag = {
        apply: jest.fn(),
    };
    factory.createDrag = viscosity => viscosity === dragViscosity ? drag : null;

    physics.addBody(bodyMass, bodyPos);
    physics.addDrag(dragViscosity);
    physics.resolve(interval);

    expect(drag.apply.mock.calls[0][0]).toBe(body);
    expect(body.resolve.mock.calls[0][0]).toBe(interval);
});

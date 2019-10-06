const Physics = require('../../../../../src/simulation-context/domain/physics/Physics');

test('resolves body with field', () => {
    const interval = 0.1;
    const field = 5;
    const body = {
        apply: jest.fn(),
        resolve: jest.fn(),
    };
    const physics = new Physics();

    physics.setField(field);
    physics.setBody(body);
    physics.resolve(interval);

    expect(body.apply.mock.calls[0][0]).toBe(field);
    expect(body.resolve.mock.calls[0][0]).toBe(interval);
});

test('resolves body with constraint', () => {
    const interval = 0.1;
    const body = {
        apply: () => {},
        resolve: () => {},
    };
    const constraint = {
        apply: jest.fn(),
    };
    const physics = new Physics();

    physics.setBody(body);
    physics.setConstraint(constraint);

    physics.resolve(interval);

    expect(constraint.apply.mock.calls[0][0]).toBe(body);
    expect(constraint.apply.mock.calls[0][1]).toBe(interval);
});
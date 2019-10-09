const ActionableConstraint = require('../../../../../src/simulation-context/domain/physics/ActionableConstraint');

test('does not apply constraint to body if collision is not happening', () => {
    const bodyPosition = 10;
    const constraintPosition = 0;
    const body = {
        getPosition() { return bodyPosition; },
        apply: jest.fn(),
    };
    const constraint = new ActionableConstraint(constraintPosition);

    constraint.apply(body, /* interval: */0.1);

    expect(body.apply).not.toBeCalled();
});

test('applies constraint to body if collision is happening', () => {
    const bodyMass = 5;
    const bodyPosition = 0;
    const bodyVelocity = 10;
    const constraintPosition = 0;
    const interval = 0.1;
    const impulse = -2 * bodyMass * bodyVelocity / interval;
    const body = {
        getMass() { return bodyMass; },
        getPosition() { return bodyPosition; },
        getVelocity() { return bodyVelocity; },
        apply: jest.fn(),
    };
    const constraint = new ActionableConstraint(constraintPosition);

    constraint.apply(body, interval);

    expect(body.apply.mock.calls[0][0]).toBe(impulse);
});
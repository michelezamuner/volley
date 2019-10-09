const ActionableField = require('../../../../../src/simulation-context/domain/physics/ActionableField');

test('applies field to body', () => {
    const force = 10;
    const body = {
        apply: jest.fn(),
    };
    const field = new ActionableField(force);

    field.apply(body);

    expect(body.apply.mock.calls[0][0]).toBe(force);
});
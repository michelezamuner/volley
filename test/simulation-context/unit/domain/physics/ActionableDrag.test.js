const ActionableDrag = require('../../../../../src/simulation-context/domain/physics/ActionableDrag');

// test('is of type Drag', () => {
//     const drag = new ActionableDrag(/* viscosity: */0.5);
// });

test('applies drag to body', () => {
    const bodyMass = 5;
    const bodyVelocity = 10;
    const viscosity = 0.5;
    const dragForce = - viscosity * bodyVelocity;
    const body = {
        getMass() { return bodyMass; },
        getVelocity() { return bodyVelocity; },
        apply: jest.fn(),
    };
    const drag = new ActionableDrag(viscosity);

    drag.apply(body);

    expect(body.apply.mock.calls[0][0]).toBe(dragForce);
});
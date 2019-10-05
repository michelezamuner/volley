const ActionableBody = require('../../../../../src/simulation-context/domain/physics/ActionableBody');

test('is of type Body', () => {
    const body = new ActionableBody(/* mass: */5);

    expect(body.getMass).toBeDefined();
    expect(body.getPosition).toBeDefined();
    expect(body.getVelocity).toBeDefined();
    expect(body.getAcceleration).toBeDefined();
});

test('defaults cinematic properties to zero', () => {
    const body = new ActionableBody(/* mass: */5);

    expect(body.getPosition()).toBe(0);
    expect(body.getVelocity()).toBe(0);
    expect(body.getAcceleration()).toBe(0);
});

test('exposes mass', () => {
    const mass = 5;
    const body = new ActionableBody(mass);

    expect(body.getMass()).toBe(mass);
});

test('updates status when applying force', () => {
    const mass = 5;
    const time = 0.1;
    const force = 5;
    const acceleration = 1;

    // [initial_position, inital_velocity, final_position, final_velocity]
    const examples = [
        [3, 2, 3.21, 2.1],
        [1, 3, 1.31, 3.1],
        [3, 5, 3.51, 5.1],
    ];
    for (const example of examples) {
        const initialPosition = example[0];
        const initialVelocity = example[1];
        const finalPosition = example[2];
        const finalVelocity = example[3];

        const body = new ActionableBody(mass, initialPosition, initialVelocity);
        body.apply(force, time);

        // acceleration = force / mass
        expect(body.getAcceleration()).toBe(acceleration);
        // velocity = initial_velocity + acceleration * time
        expect(body.getVelocity()).toBe(finalVelocity);
        // position = initial_poisition + velocity * time
        expect(body.getPosition()).toBe(finalPosition);
    }
});

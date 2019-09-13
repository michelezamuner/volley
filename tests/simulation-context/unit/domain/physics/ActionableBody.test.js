const ActionableBody = require('../../../../../src/simulation-context/domain/physics/ActionableBody');

test('is of type Body', () => {
    const body = new ActionableBody(/* mass: */5);

    expect(body.getMass).toBeDefined();
    expect(body.getPosition).toBeDefined();
    expect(body.getVelocity).toBeDefined();
    expect(body.getAcceleration).toBeDefined();
});

test('defaults cinematic properties to zero', () => {
    const body = new ActionableBody(/* mass */5);

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

    // [initial_pos, inital_vel, initial_acc, final_pos, final_vel, final_acc]
    const examples = [
        [3, 2, 1, 3.22, 2.2, 2],
        [1, 2, 3, 1.24, 2.4, 4],
        [3, 5, 1, 3.52, 5.2, 2],
    ];
    for (const example of examples) {
        const initialPosition = example[0];
        const initialVelocity = example[1];
        const initialAcceleration = example[2];
        const finalPosition = example[3];
        const finalVelocity = example[4];
        const finalAcceleration = example[5];

        const body = new ActionableBody(mass, initialPosition, initialVelocity, initialAcceleration);
        body.apply(force, time);

        // acceleration = initial_acceleration + force / mass
        expect(body.getAcceleration()).toBe(finalAcceleration);
        // velocity = initial_velocity + acceleration * time
        expect(body.getVelocity()).toBe(finalVelocity);
        // position = initial_poisition + velocity * time
        expect(body.getPosition()).toBe(finalPosition);
    }
});

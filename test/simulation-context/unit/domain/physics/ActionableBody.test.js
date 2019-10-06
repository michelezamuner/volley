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

test('resolves simulation step with no force applied', () => {
    const velocity = 5;
    const interval = 0.1;
    const initialPosition = 10;
    const finalPosition = 10.5; 
    const body = new ActionableBody(/* mass: */5, initialPosition, velocity);

    body.resolve(interval);

    expect(body.getPosition()).toBe(finalPosition);
    expect(body.getVelocity()).toBe(velocity);
    expect(body.getAcceleration()).toBe(0);
});

test('resolves simulation step with one force applied', () => {
    const mass = 5;
    const interval = 0.1;
    const force = 10;
    const acceleration = 2;

    // [initial_position, initial_velocity, final_position, final_velocity]
    const examples = [
        [3, 2, 3.22, 2.2],
        [1, 3, 1.32, 3.2],
        [3, 5, 3.52, 5.2],
    ];
    for (const example of examples) {
        const initialPosition = example[0];
        const initialVelocity = example[1];
        const finalPosition = example[2];
        const finalVelocity = example[3];
        const body = new ActionableBody(mass, initialPosition, initialVelocity);

        body.apply(force);
        body.resolve(interval);

        // acceleration = force / mass
        expect(body.getAcceleration()).toBe(acceleration);
        // velocity = initial_velocity + acceleration * interval
        expect(body.getVelocity()).toBe(finalVelocity);
        // position = initial_position + velocity * interval
        expect(body.getPosition()).toBe(finalPosition);
    }
});

test('resolves simulation step with multiple forces applied', () => {
    const mass = 5;
    const interval = 0.1;
    const forces = [1, 4, 10];
    const acceleration = 3;

    // [initial_position, initial_velocity, final_position, final_velocity]
    const examples = [
        [3, 2, 3.23, 2.3],
        [1, 3, 1.33, 3.3],
        [3, 5, 3.53, 5.3],
    ];
    for (const example of examples) {
        const initialPosition = example[0];
        const initialVelocity = example[1];
        const finalPosition = example[2];
        const finalVelocity = example[3];
        const body = new ActionableBody(mass, initialPosition, initialVelocity);

        for (const force of forces) {
            body.apply(force);
        }
        body.resolve(interval);

        // acceleration = force / mass
        expect(body.getAcceleration()).toBe(acceleration);
        // velocity = initial_velocity + acceleration * interval
        expect(body.getVelocity()).toBe(finalVelocity);
        // position = initial_position + velocity * interval
        expect(Number.parseFloat(body.getPosition().toPrecision(3))).toBe(finalPosition);
    }
});

test('clears force after resolution', () => {
    const interval = 0.1;
    const mass = 4;
    const force = 2;
    // velocity = force / mass * interval
    const expectedVelocity = 0.05;
    const body = new ActionableBody(mass, /* position: */10, /* velocity: */0);
    body.apply(force);

    body.resolve(interval);
    expect(body.getVelocity()).toBe(expectedVelocity);

    // force here should be back to zero
    body.resolve(interval);
    expect(body.getVelocity()).toBe(expectedVelocity);
});

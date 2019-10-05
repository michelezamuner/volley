const promisify = require('util').promisify;
const exec = promisify(require('child_process').exec);

jest.setTimeout(15000);

test('logging the positions of the ball', async () => {
    const script = __dirname + '/run-simulation.sh';
    const output = await exec(`bash ${script}`);

    const expected = [
        200,
        195.0967,
        180.3868,
        155.8703,
        121.5472,
        77.4175,
        23.4812,
    ];
    const positions = output.stdout.trim().split("\n").map(Number.parseFloat);

    const u = 0.05;
    for (const i in expected) {
        expect(positions[i]).toBeGreaterThanOrEqual(expected[i] - u);
        expect(positions[i]).toBeLessThanOrEqual(expected[i] + u);
    }
});
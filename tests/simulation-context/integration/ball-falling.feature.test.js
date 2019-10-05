const promisify = require('util').promisify;
const exec = promisify(require('child_process').exec);

jest.setTimeout(15000);

test('logging the ball positions', async () => {
    const script = __dirname + '/ball-falling.sh';
    const output = await exec(`bash ${script}`);

    const expected = [
        100,
        95.0967,
        80.3868,
        55.8703,
        21.5472,
    ];
    const positions = output.stdout.trim().split("\n").map(Number.parseFloat);

    const u = 0.03;
    for (const i in expected) {
        expect(positions[i]).toBeGreaterThanOrEqual(expected[i] - u);
        expect(positions[i]).toBeLessThanOrEqual(expected[i] + u);
    }
});
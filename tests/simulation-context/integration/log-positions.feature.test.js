const promisify = require('util').promisify;
const exec = promisify(require('child_process').exec);

test.skip('logging the ball positions', async () => {
    const script = __dirname + '/logging-the-ball-positions.sh';
    const output = await exec(`bash ${script}`);

    const expected = [
        100,
        90.19335,
        70.58005,
        41.1601,
    ];
    const positions = output.stdout.trim().split("\n");

    expect(positions.length === expected.length);
    const u = 0.01;
    for (const i in positions) {
        const position = positions[i];
        const value = Number.parseFloat(position);
        expect(value).toBeGreaterThanOrEqual(expected[i] - u);
        expect(value).toBeLessThanOrEqual(expected[i] + u);
    }
});
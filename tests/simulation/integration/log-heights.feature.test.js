const promisify = require('util').promisify;
const exec = promisify(require('child_process').exec);

test.skip('logging the ball heights', async () => {
    const script = __dirname + '/logging-the-ball-heights.sh';
    const output = await exec(`bash ${script}`);

    const expected = [
        100,
        90.19335,
        70.58005,
        41.1601,
    ];
    const heights = output.stdout.trim().split("\n");

    expect(heights.length === expected.length);
    const u = 0.01;
    for (const i in heights) {
        const height = heights[i];
        const value = Number.parseFloat(height);
        expect(value).toBeGreaterThanOrEqual(expected[i] - u);
        expect(value).toBeLessThanOrEqual(expected[i] + u);
    }
});
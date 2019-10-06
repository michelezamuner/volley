const promisify = require('util').promisify;
const exec = promisify(require('child_process').exec);

module.exports = async (name, wait, args, expected) => {
    const script = __dirname + '/run-simulation.sh';
    const output = await exec(`bash ${script} ${name} ${wait} ${args.join(' ')}`);

    const positions = output.stdout.trim().split("\n").map(Number.parseFloat);

    const u = 0.05;
    for (const i in expected) {
        expect(positions[i]).toBeGreaterThanOrEqual(expected[i] - u);
        expect(positions[i]).toBeLessThanOrEqual(expected[i] + u);
    }
};
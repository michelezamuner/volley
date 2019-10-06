const CliConfiguration = require('../../../../../../../src/simulation-context/adapters/drivers/cli-configuration/configuration-port/CliConfiguration');

test('implements application configuration', () => {
    const conf = new CliConfiguration([]);
    expect(conf.getBallMass).toBeDefined();
    expect(conf.getBallPos).toBeDefined();
    expect(conf.getFloorPos).toBeDefined();
});

test('provide cli configuration values', () => {
    const ballMass = 5;
    const ballPos = 100;
    const floorPos = 0;
    const args = [
        `--ball-mass=${ballMass}`,
        `--ball-pos=${ballPos}`,
        `--floor-pos=${floorPos}`,
    ];
    const conf = new CliConfiguration(args);

    expect(conf.getBallMass()).toBe(ballMass);
    expect(conf.getBallPos()).toBe(ballPos);
    expect(conf.getFloorPos()).toBe(floorPos);
});
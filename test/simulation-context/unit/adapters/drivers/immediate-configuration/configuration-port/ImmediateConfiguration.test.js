const ImmediateConfiguration = require('../../../../../../../src/simulation-context/adapters/drivers/immediate-configuration/configuration-port/ImmediateConfiguration');

test('implements application configuration', () => {
    const conf = new ImmediateConfiguration(/* ballMass: */5, /* ballPos: */100);
    expect(conf.getBallMass).toBeDefined();
    expect(conf.getBallPos).toBeDefined();
});

test('provide immediate configuration values', () => {
    const ballMass = 5;
    const ballPos = 100;
    const conf = new ImmediateConfiguration(ballMass, ballPos);

    expect(conf.getBallMass()).toBe(ballMass);
    expect(conf.getBallPos()).toBe(ballPos);
});
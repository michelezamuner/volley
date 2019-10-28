const WebConfiguration = require('../../../../../../../src/simulation-context/adapters/drivers/web-configuration/configuration-port/WebConfiguration');

test('implements application configuration', () => {
    const conf = new WebConfiguration();
    expect(conf.getBallMass).toBeDefined();
    expect(conf.getBallPos).toBeDefined();
    expect(conf.getFloorPos).toBeDefined();
    expect(conf.getAirViscosity).toBeDefined();
    expect(conf.getBallElasticity).toBeDefined();
});

test('provide configuration values from URL query', () => {
    const ballMass = 5;
    const ballPos = 100;
    const floorPos = 0;
    const airViscosity = 0.5;
    const ballElasticity = 0.9;
    const urlSearchParams = {
        get: key => {
            switch (key) {
                case 'ball-mass': return ballMass;
                case 'ball-pos': return ballPos;
                case 'floor-pos': return floorPos;
                case 'air-viscosity': return airViscosity;
                case 'ball-elasticity': return ballElasticity;
                default: return null;
            }
        },
    };
    const conf = new WebConfiguration(urlSearchParams);

    expect(conf.getBallMass()).toBe(ballMass);
    expect(conf.getBallPos()).toBe(ballPos);
    expect(conf.getFloorPos()).toBe(floorPos);
    expect(conf.getAirViscosity()).toBe(airViscosity);
    expect(conf.getBallElasticity()).toBe(ballElasticity);
});

test('converts invalid values to null', () => {
    const urlSearchParams = {
        get: key => {
            switch (key) {
                case 'ball-mass': return 'asde';
                case 'ball-pos': return null;
                case 'floor-pos': return null;
                case 'air-viscosity': return 'darte';
                case 'ball-elasticity': return 'ewdfawe';
                default: return null;
            }
        },
    };
    const conf = new WebConfiguration(urlSearchParams);

    expect(conf.getBallMass()).toBe(null);
    expect(conf.getBallPos()).toBe(null);
    expect(conf.getFloorPos()).toBe(null);
    expect(conf.getAirViscosity()).toBe(null);
    expect(conf.getBallElasticity()).toBe(null);
});
const expect = require('./expect');

jest.setTimeout(15000);

test('ball is free falling', async () => {
    const args = [
        '--ball-mass=5',
        '--ball-pos=200',
    ];
    const expected = [
        200,
        195.0967,
        180.3868,
        155.8703,
        121.5472,
        77.4175,
        23.4812,
    ];
    await expect('ball-is-free-falling', 7, args, expected);
});

test('ball is bouncing on the floor', async () => {
    const args = [
        '--ball-mass=5',
        '--ball-pos=50',
        '--floor-pos=0',
    ];
    const expected = [
        50,
        45.0967,
        30.3868,
        5.8703,
        22.0711,
        40.5724,
        49.2671,
        48.1552,
        37.2367,
        16.5115,
    ];
    await expect('ball-is-bouncing-on-the-floor', 10, args, expected);
});
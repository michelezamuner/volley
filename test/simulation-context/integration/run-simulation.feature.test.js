const expect = require('./expect');

jest.setTimeout(15000);

test('ball is free falling', async () => {
    const x0 = 200;
    const g = 9.8066;
    const seconds = 7;
    const model = t => x0 - g/2 * t*t;

    const expected = [...Array(seconds).keys()].map(model);
    const args = [
        '--ball-mass=5',
        `--ball-pos=${x0}`,
    ];
    
    await expect('ball-is-free-falling', seconds, args, expected);
});

test('ball is bouncing on the floor', async () => {
    const x0 = 50;
    const g = 9.8066;
    const tb = Math.sqrt(2 * x0 / g);
    const model = t => {
        if (t < tb) return x0 - g/2 * t*t;
        t -= tb;
        return Math.sqrt(2 * x0 * g) * t - g/2 * t*t;
    };
    
    const seconds = 10;
    const expected = [...Array(seconds).keys()].map(model);
    const args = [
        '--ball-mass=5',
        `--ball-pos=${x0}`,
        '--floor-pos=0',
    ];
    
    await expect('ball-is-bouncing-on-the-floor', seconds, args, expected);
});

test('ball is bouncing on the floor with air friction', async () => {
    const x0 = 20;
    const m = 5;
    const g = 9.8066;
    const h = 0.5;
    const k = h / m;
    // numerically calculate tb: tbn+1 = tbn - x(tbn)/x'(tbn)
    const tb = root(
        2,
        t => x0 - g / (k * k) * (Math.exp(-k * t) - 1) - g / k * t,
        t => g / k * (Math.exp(-k * t) - 1)
    );
    // calculate vb: v(t) = g/k * (e^(-k * t) - 1)
    const vb = g / k * (Math.exp(-k * tb) - 1);
    const model = t => {
        if (t < tb) return x0 - g / (k * k) * (Math.exp(-k * t) - 1) - g / k * t;
        t -= tb;
        return (-vb * k + g) * (1 - Math.exp(-k * t)) / (k * k) - g / k * t;
    };

    const seconds = 6;
    const expected = [...Array(seconds).keys()].map(model);
    const args = [
        '--ball-mass=5',
        `--ball-pos=${x0}`,
        '--floor-pos=0',
        `--air-viscosity=${h}`,
    ];

    await expect('ball-is-bouncing-on-the-floor-with-air-friction', seconds, args, expected);
});

test('ball is bouncing on the floor with air friction and non-perfect bounce', async () => {
    const x0 = 20;
    const m = 5;
    const g = 9.8066;
    const h = 0.5;
    const k = h / m;
    const u = 0.75;
    // numerically calculate tb: tbn+1 = tbn - x(tbn)/x'(tbn)
    const tb = root(
        2,
        t => x0 - g / (k * k) * (Math.exp(-k * t) - 1) - g / k * t,
        t => g / k * (Math.exp(-k * t) - 1)
    );
    // calculate vb: v(t) = g/k * (e^(-k * t) - 1)
    const vb = g / k * (Math.exp(-k * tb) - 1);
    const model = t => {
        if (t < tb) return x0 - g / (k * k) * (Math.exp(-k * t) - 1) - g / k * t;
        t -= tb;
        return (-u * vb * k + g) * (1 - Math.exp(-k * t)) / (k * k) - g / k * t;
    };

    const seconds = 5;
    const expected = [...Array(seconds).keys()].map(model);
    const args = [
        '--ball-mass=5',
        `--ball-pos=${x0}`,
        '--floor-pos=0',
        `--air-viscosity=${h}`,
        `--ball-elasticity=${u}`,
    ];

    await expect('ball-is-bouncing-on-the-floor-with-air-friction-and-non-perfect-bounce', seconds, args, expected);
});

/**
 * @param {Number} t0 
 * @param {Function} ft 
 * @param {Function} fdt 
 */
function root(t0, ft, fdt) {
    let tbp = null;
    let tbn = t0;
    do {
        tbp = tbn;
        tbn = tbp - ft(tbp) / fdt(tbp);
    } while (Math.abs(tbp - tbn) > 0.0001);

    return tbn;
}
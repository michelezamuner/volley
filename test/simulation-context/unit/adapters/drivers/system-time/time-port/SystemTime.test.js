const SystemTime = require('../../../../../../../src/simulation-context/adapters/drivers/system-time/time-port/SystemTime');

test('converts nanoseconds to seconds', () => {
    const nanoseconds = BigInt(1234567890123);
    const seconds = 1234.567890123;
    const process = {
        hrtime: {
            bigint() { return nanoseconds; },
        },
    };

    const time = new SystemTime(process);

    expect(time.getProgressiveTime()).toBe(seconds);
});
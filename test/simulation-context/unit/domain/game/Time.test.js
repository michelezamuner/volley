const Time = require('../../../../../src/simulation-context/domain/game/Time');

test('provides elapsed times', () => {
    let call = 0;
    const times = [1.1234, 2.4235, 4.5632];
    const provider = {
        getProgressiveTime() { return times[call++]; },
    };
    const time = new Time(provider);

    time.reset();
    expect(time.elapsed()).toBe(times[1] - times[0]);
    expect(time.elapsed()).toBe(times[2] - times[1]);
});

test('must be reset before getting elapsed', () => {
    const time = new Time({});
    expect(() => time.elapsed()).toThrow('Cannot use time that has not been reset');
});

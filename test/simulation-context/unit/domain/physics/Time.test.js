const Time = require('../../../../../src/simulation-context/domain/physics/Time');

test('tells if is running', () => {
    const provider = {
        getProgressiveTime() { return 0; }
    };
    const time = new Time(provider);

    expect(time.isRunning()).toBe(false);

    time.start();
    expect(time.isRunning()).toBe(true);
});

test('provides consecutive intervals after having being started', () => {
    let call = 0;
    const times = [1.1234, 2.4235, 4.5632];
    const provider = {
        getProgressiveTime() { return times[call++]; },
    };
    const time = new Time(provider);

    time.start();
    expect(time.tick()).toBe(times[1] - times[0]);
    expect(time.tick()).toBe(times[2] - times[1]);
});

test('fails if starting time again that is already started', () => {
    const provider = {
        getProgressiveTime() { return 0; }
    };
    const time = new Time(provider);

    time.start();
    expect(() => time.start()).toThrow('Cannot start again time that is already running');    
});

test('fails if getting interval while not started', () => {
    const time = new Time({});
    expect(() => time.tick()).toThrow('Cannot use time that is not running');
});

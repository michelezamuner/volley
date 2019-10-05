const Time = require('../../../../../src/simulation-context/domain/physics/Time');

test('provides current time after being started', () => {
    let call = 0;
    const times = [1.1234, 2.4235, 4.5632];
    const provider = {
        getCurrentTimeInSeconds() { return times[call++]; },
    };
    const time = new Time(provider);

    time.start();
    expect(time.current()).toBe(times[1] - times[0]);
    expect(time.current()).toBe(times[2] - times[0]);
});

test('tells if is running', () => {
    const provider = {
        getCurrentTimeInSeconds() { return 0; }
    };
    const time = new Time(provider);

    expect(time.isRunning()).toBe(false);

    time.start();
    expect(time.isRunning()).toBe(true);
});

test('fails if starting time again that is already started', () => {
    const provider = {
        getCurrentTimeInSeconds() { return 0; }
    };
    const time = new Time(provider);

    time.start();
    expect(() => time.start()).toThrow('Cannot start again time that is already running');    
});

test('fails if getting current time while not started', () => {
    const time = new Time({});
    expect(() => time.current()).toThrow('Cannot use time that is not running');
});

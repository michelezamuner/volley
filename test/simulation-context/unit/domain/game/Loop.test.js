const Loop = require('../../../../../src/simulation-context/domain/game/Loop');

test('starts loop with reset time and callback', () => {
    const time = {
        reset: jest.fn(),
        elapsed: jest.fn(),
    };
    const provider = {
        run(callback) {
            // Reset must be called before elapsed
            expect(time.reset).toBeCalledTimes(1);
            callback();
        }
    };
    const loop = new Loop(provider, time);
    const callback = jest.fn();

    loop.start(callback);

    expect(callback).toBeCalledTimes(1);
    expect(time.elapsed).toBeCalledTimes(1);
});
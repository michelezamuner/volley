const SimulationService = require('../../../../../../src/simulation-context/application/simulation-port/run-simulation-use-case/SimulationService');
const Frame = require('../../../../../../src/simulation-context/application/simulation-port/run-simulation-use-case/Frame');

test('runs simulation producing frames', () => {
    let updates = 0;
    let ticks = 0;
    const intervals = [0.1234, 0.5434, 1.2234];
    const ballPositions = [10, 9.8765, 5.1234];
    const floorPosition = 0;
    const options = {
        getBallMass() { return 5; },
        getBallElasticity() { return 0.5; },
        getBallPosition() { return 10; },
        getFloorPosition() { return floorPosition; },
        getAirViscosity() { return 0.5; },
    };
    const simulation = {
        update: jest.fn(() => updates++),
        getBallPosition: () => ballPositions[ticks],
    };
    const simulationFactory = {
        create(opt) {
            return opt === options ? simulation : null;
        }
    }
    const loop = {
        start(callback) {
            while (ticks < intervals.length) {
                callback(intervals[ticks++]);
            }
        }
    };
    const service = new SimulationService(simulationFactory, loop);

    const callback = jest.fn(arg => {
        expect(arg).toEqual(new Frame(ballPositions[ticks], floorPosition));
    });
    service.run(options, callback);

    expect(callback).toBeCalledTimes(updates);
    for (const i in intervals) {
        expect(simulation.update.mock.calls[i][0]).toBe(intervals[i]);
    }
});

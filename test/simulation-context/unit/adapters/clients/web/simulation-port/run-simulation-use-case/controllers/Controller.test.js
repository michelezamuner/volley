const Controller = require('../../../../../../../../../src/simulation-context/adapters/clients/web/simulation-port/run-simulation-use-case/controllers/Controller');
const Options = require('../../../../../../../../../src/simulation-context/domain/simulation/Options');
const RunSimulationRequest = require('../../../../../../../../../src/simulation-context/application/simulation-port/run-simulation-use-case/RunSimulationRequest');

test('calls service', () => {
    const ballMass = 5;
    const ballElasticity = 0.5;
    const ballPosition = 10;
    const floorPosition = 0;
    const request = new RunSimulationRequest(new Options(
        ballMass,
        ballElasticity,
        ballPosition,
        floorPosition,
        null
    ));
    const useCase = {
        runSimulation: jest.fn(),
    };
    const params = {
        get(name) {
            switch(name) {
                case 'ball-mass': return ballMass;
                case 'ball-elasticity': return ballElasticity;
                case 'ball-pos': return ballPosition;
                case 'floor-pos': return floorPosition;
            }

            return null;
        }
    };
    const controller = new Controller(useCase, params);

    controller.runSimulation();

    expect(useCase.runSimulation.mock.calls[0][0]).toStrictEqual(request);
});
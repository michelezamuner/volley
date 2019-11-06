const Controller = require('../../../../../../../../../src/simulation-context/adapters/clients/console/simulation-port/run-simulation-use-case/controllers/Controller');
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
    const controller = new Controller(useCase);
    const args = [
        `--ball-mass=${ballMass}`,
        `--ball-elasticity=${ballElasticity}`,
        `--ball-pos=${ballPosition}`,
        `--floor-pos=${floorPosition}`,
    ];

    controller.runSimulation(args);

    expect(useCase.runSimulation.mock.calls[0][0]).toStrictEqual(request);
});
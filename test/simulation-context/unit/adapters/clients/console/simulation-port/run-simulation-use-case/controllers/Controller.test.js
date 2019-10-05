const Controller = require('../../../../../../../../../src/simulation-context/adapters/clients/console/simulation-port/run-simulation-use-case/controllers/Controller');

test('calls service', () => {
    const useCase = {
        runSimulation: jest.fn(),
    };
    const controller = new Controller(useCase);

    controller.runSimulation();

    expect(useCase.runSimulation).toBeCalled();
});
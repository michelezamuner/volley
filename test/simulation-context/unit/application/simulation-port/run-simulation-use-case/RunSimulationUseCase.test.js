const RunSimulationUseCase = require('../../../../../../src/simulation-context/application/simulation-port/run-simulation-use-case/RunSimulationUseCase');
const RunSimulationResponse = require('../../../../../../src/simulation-context/application/simulation-port/run-simulation-use-case/RunSimulationResponse');

test('runs simulation and presents current frame', () => {
    const frame = {};
    const response = new RunSimulationResponse(frame);
    const presenter = {
        present: jest.fn(),
    };
    const service = {
        run(callback) { callback(frame); },
    };
    
    const useCase = new RunSimulationUseCase(service, presenter);

    useCase.runSimulation();

    expect(presenter.present.mock.calls[0][0]).toEqual(response);
});
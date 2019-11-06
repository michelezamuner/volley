const RunSimulationUseCase = require('../../../../../../src/simulation-context/application/simulation-port/run-simulation-use-case/RunSimulationUseCase');
const RunSimulationRequest = require('../../../../../../src/simulation-context/application/simulation-port/run-simulation-use-case/RunSimulationRequest');
const RunSimulationResponse = require('../../../../../../src/simulation-context/application/simulation-port/run-simulation-use-case/RunSimulationResponse');

test('runs simulation and presents current frame', () => {
    const frame = {};
    const options = {};
    const request = new RunSimulationRequest(options);
    const response = new RunSimulationResponse(frame);
    const presenter = {
        present: jest.fn(),
    };
    const service = {
        run(opt, callback) {
            if (opt === options) {
                callback(frame);
            }
        },
    };
    
    const useCase = new RunSimulationUseCase(service, presenter);

    useCase.runSimulation(request);

    expect(presenter.present.mock.calls[0][0]).toStrictEqual(response);
});
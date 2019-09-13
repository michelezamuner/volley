const RunSimulationUseCase = require('../../../../../../src/simulation-context/application/simulation-port/run-simulation-use-case/RunSimulationUseCase');

test('runs simulation and presents ball positions', () => {
    const pos = 123;
    const ball = {
        getPosition() { return pos; },
    };
    const presenter = {
        present: jest.fn(),
    };
    const service = {
        run(callback) { callback(ball); },
    };
    
    const useCase = new RunSimulationUseCase(service, presenter);

    useCase.runSimulation();

    expect(presenter.present).toBeCalledWith(pos);
});
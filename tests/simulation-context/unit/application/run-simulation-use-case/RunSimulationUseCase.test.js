const RunSimulationUseCase = require('../../../../../src/simulation-context/application/run-simulation-use-case/RunSimulationUseCase');

test('runs simulation and presents body positions', () => {
    const pos = 123;
    const physics = {
        getBody() {
            return {
                getPosition() {
                    return pos;
                },
            };
        },
    };
    const presenter = {
        present: jest.fn(),
    };
    const service = {
        runSimulation(callback) {
            callback(physics);
        },
    };
    
    const useCase = new RunSimulationUseCase(service, presenter);

    useCase.runSimulation();

    expect(presenter.present).toBeCalledWith(pos);
});
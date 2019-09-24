/**
 * @package SimulationContext.Adapters.LoggingConsoleClient.SimulationPort.RunSimulationUseCase.Controllers
 * @requires SimulationContext.Application.SimulationPort.RunSimulationUseCase.RunSimulationUseCase
 */
module.exports = class Controller {
    /**
     * @param {RunSimulationUseCase} useCase
     */
    constructor(useCase) {
        this._useCase = useCase;
    }

    runSimulation() {
        this._useCase.runSimulation();
    }
};
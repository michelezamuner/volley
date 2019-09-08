/**
 * @package SimulationContext.Application.RunSimulationUseCase
 * @requires SimulationContext.Application.RunSimulationUseCase.SimulationService
 * @requires SimulationContext.Application.RunSimulationUseCase.RunSimulationPresenter
 */

module.exports = class RunSimulationUseCase {
    /**
     * @param {SimulationService} service
     * @param {RunSimulationPresenter} presenter 
     */
    constructor(service, presenter) {
        this._service = service;
        this._presenter = presenter;
    }

    runSimulation() {
        this._service.runSimulation(physics => {
            this._presenter.present(physics.getBody().getPosition());
        });
    }
};
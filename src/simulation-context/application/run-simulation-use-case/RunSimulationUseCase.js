/**
 * @package SimulationContext.Application.RunSimulationUseCase
 * @requires SimulationContext.Application.RunSimulationUseCase.SimulationService
 * @requires SimulationContext.Application.RunSimulationUseCase.RunSimulationPresenter
 * @requires SimulationContext.Domain.Physics.Body
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
        this._service.run(/** @type {Body} */ball => {
            this._presenter.present(ball.getPosition());
        });
    }
};

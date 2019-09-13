/**
 * @package SimulationContext.Application.SimulationPort.RunSimulationUseCase
 * @requires SimulationContext.Application.SimulationPort.RunSimulationUseCase.SimulationService
 * @requires SimulationContext.Application.SimulationPort.RunSimulationUseCase.SimulationPresenter
 * @requires SimulationContext.Domain.Physics.Body
 */

module.exports = class RunSimulationUseCase {
    /**
     * @param {SimulationService} service
     * @param {SimulationPresenter} presenter 
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

const RunSimulationResponse = require('./RunSimulationResponse');

/**
 * @package SimulationContext.Application.SimulationPort.RunSimulationUseCase
 * @requires SimulationContext.Application.SimulationPort.RunSimulationUseCase.SimulationService
 * @requires SimulationContext.Application.SimulationPort.RunSimulationUseCase.SimulationPresenter
 * @requires SimulationContext.Application.SimulationPort.RunSimulationUseCase.RunSimulationRequest
 * @requires SimulationContext.Application.SimulationPort.RunSimulationUseCase.RunSimulationResponse
 * @requires SimulationContext.Application.SimulationPort.RunSimulationUseCase.Frame
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

    /**
     * @param {RunSimulationRequest} request 
     */
    runSimulation(request) {
        this._service.run(request.getOptions(), /** @type {Frame} */frame => {
            this._presenter.present(new RunSimulationResponse(frame));
        });
    }
};

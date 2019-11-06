const Options = require('../../../../../../domain/simulation/Options');
const RunSimulationRequest = require('../../../../../../application/simulation-port/run-simulation-use-case/RunSimulationRequest');

/**
 * @package SimulationContext.Adapters.Clients.Web.SimulationPort.RunSimulationUseCase.Controllers
 * @requires SimulationContext.Application.SimulationPort.RunSimulationUseCase.RunSimulationUseCase
 * @requires SimulationContext.Adapters.Clients.Web.SimulationPort.RunSimulationUseCase.Controllers.UrlSearchParams
 */
module.exports = class Controller {
    /**
     * @param {RunSimulationUseCase} useCase
     * @param {UrlSearchParam} params
     */
    constructor(useCase, params) {
        this._useCase = useCase;
        this._params = params;
    }

    runSimulation() {
        const options = new Options(
            this._getParam('ball-mass'),
            this._getParam('ball-elasticity'),
            this._getParam('ball-pos'),
            this._getParam('floor-pos'),
            this._getParam('air-viscosity')
        );
        this._useCase.runSimulation(new RunSimulationRequest(options));
    }

    /**
     * @param {string} name 
     * @return {Number|null}
     */
    _getParam(name) {
        const param = Number.parseFloat(this._params.get(name));
        
        return isNaN(param) ? null : param;
    }
};
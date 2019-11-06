/**
 * @package SimulationContext.Application.SimulationPort.RunSimulationUseCase
 * @requires SimulationContext.Domain.Simulation.Options
 */
module.exports = class RunSimulationRequest {
    /**
     * @param {Options} options 
     */
    constructor(options) {
        this._options = options;
    }

    /**
     * @return {Options}
     */
    getOptions() {
        return this._options;
    }
};
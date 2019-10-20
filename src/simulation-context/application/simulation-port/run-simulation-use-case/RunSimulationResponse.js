/**
 * @package SimulationContext.Application.SimulationPort.RunSimulationUseCase
 * @requires SimulationContext.Application.SimulationPort.RunSimulationUseCase.Frame
 */
module.exports = class RunSimulationResponse {
    /**
     * @param {Frame} frame 
     */
    constructor(frame) {
        this._frame = frame;
    }

    /**
     * @returns {Frame}
     */
    getFrame() {
        return this._frame;
    }
};
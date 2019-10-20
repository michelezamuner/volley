/**
 * @package SimulationContext.Application.SimulationPort.RunSimulationUseCase
 * @requires SimulationContext.Domain.Physics.Body
 */
module.exports = class Frame {
    /**
     * @param {Body} ball 
     */
    constructor(ball) {
        this._ball = ball;
    }

    /**
     * @return {Body}
     */
    getBall() {
        return this._ball;
    }
};
/**
 * @package SimulationContext.Application.SimulationPort.RunSimulationUseCase
 */
module.exports = class Frame {
    /**
     * @param {Number} ballPos
     * @param {Number|null} floorPos
     */
    constructor(ballPos, floorPos = null) {
        this._ballPos = ballPos;
        this._floorPos = floorPos;
    }

    /**
     * @return {Number}
     */
    getBallPos() {
        return this._ballPos;
    }

    /**
     * @return {Number}
     */
    getFloorPos() {
        return this._floorPos;
    }
};
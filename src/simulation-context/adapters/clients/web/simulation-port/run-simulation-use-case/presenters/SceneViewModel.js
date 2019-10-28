/**
 * @package SimulationContext.Adapters.Clients.Web.SimulationPort.RunSimulationUseCase.Pesenters
 */
module.exports = class SceneViewModel {
    /**
     * @param {Number} ballPos 
     * @param {Number} floorPos 
     */
    constructor(ballPos, floorPos) {
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
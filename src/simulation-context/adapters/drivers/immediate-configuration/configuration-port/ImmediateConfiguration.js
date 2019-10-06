/**
 * @package SimulationContext.Adapters.Drivers.CliConfiguration.ConfigurationPort
 * @requires SimulationContext.Application.ConfigurationPort.Configuration
 * @implements Configuration
 */
module.exports = class ImmediateConfiguration {
    /**
     * @param {number} ballMass
     * @param {number} ballPos
     * @param {number|null} floorPos
     */
    constructor(ballMass, ballPos, floorPos = null) {
        this._ballMass = ballMass;
        this._ballPos = ballPos;
        this._floorPos = floorPos;
    }

    /**
     * @override
     */
    getBallMass() {
        return this._ballMass;
    }

    /**
     * @override
     */
    getBallPos() {
        return this._ballPos;
    }

    /**
     * @override
     */
    getFloorPos() {
        return this._floorPos;
    }
};
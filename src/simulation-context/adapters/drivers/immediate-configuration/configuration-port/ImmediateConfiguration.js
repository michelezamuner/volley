/**
 * @package SimulationContext.Adapters.Drivers.CliConfiguration.ConfigurationPort
 * @requires SimulationContext.Application.ConfigurationPort.Configuration
 * @implements Configuration
 */
module.exports = class ImmediateConfiguration {
    /**
     * @param {number} ballMass 
     * @param {number} ballPos 
     */
    constructor(ballMass, ballPos) {
        this._ballMass = ballMass;
        this._ballPos = ballPos;
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
};
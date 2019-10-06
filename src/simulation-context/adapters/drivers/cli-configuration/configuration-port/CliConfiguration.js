/**
 * @package SimulationContext.Adapters.Drivers.CliConfiguration.ConfigurationPort
 * @requires SimulationContext.Application.ConfigurationPort.Configuration
 * @implements Configuration
 */
module.exports = class CliConfiguration {
    /**
     * @param {Array} args
     */
    constructor(args) {
        this._ballMass = null;
        this._ballPos = null;
        this._floorPos = null;
        for (const arg of args) {
            if (arg.startsWith('--ball-mass=')) {
                this._ballMass = Number.parseFloat(arg.substring(12));
            }
            if (arg.startsWith('--ball-pos=')) {
                this._ballPos = Number.parseFloat(arg.substring(11));
            }
            if (arg.startsWith('--floor-pos=')) {
                this._floorPos = Number.parseFloat(arg.substring(12));
            }
        }
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
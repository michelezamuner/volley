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
        this._ballMass = this._parse(args, '--ball-mass=');
        this._ballPos = this._parse(args, '--ball-pos=');
        this._floorPos = this._parse(args, '--floor-pos=');
        this._airViscosity = this._parse(args, '--air-viscosity=');
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

    /**
     * @override
     */
    getAirViscosity() {
        return this._airViscosity;
    }

    /**
     * @param {Array} args
     * @param {string} name
     * @return {Number|null}
     */
    _parse(args, name) {
        const size = name.length;
        for (const arg of args) {
            if (arg.startsWith(name)) {
                return Number.parseFloat(arg.substring(size));
            }
        }

        return null;
    }
};
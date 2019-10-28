/**
 * @package SimulationContext.Adapters.Drivers.WebConfiguration.ConfigurationPort
 * @requires SimulationContext.Application.ConfigurationPort.Configuration
 * @requires SimulationContext.Adapters.Drivers.WebConfiguration.ConfigurationPort.UrlSearchParams
 * @implements Configuration
 */
module.exports = class WebConfiguration {
    /**
     * @param {UrlSearchParams} params 
     */
    constructor(params) {
        this._params = params;
    }

    /**
     * @override
     */
    getBallMass() {
        return this._getParam('ball-mass');
    }

    /**
     * @override
     */
    getBallPos() {
        return this._getParam('ball-pos');
    }

    /**
     * @override
     */
    getFloorPos() {
        return this._getParam('floor-pos');
    }

    /**
     * @override
     */
    getAirViscosity() {
        return this._getParam('air-viscosity');
    }

    /**
     * @override
     */
    getBallElasticity() {
        return this._getParam('ball-elasticity');
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
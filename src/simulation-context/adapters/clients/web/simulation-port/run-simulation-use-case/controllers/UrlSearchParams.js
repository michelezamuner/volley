/**
 * @package SimulationContext.Adapters.Drivers.WebConfiguration.ConfigurationPort
 * @requires URLSearchParams
 * @requires window
 */
module.exports = class UrlSearchParams {
    constructor() {
        this._params = new URLSearchParams(window.location.search);
    }

    /**
     * @param {string|null} name 
     */
    get(name) {
        return this._params.get(name);
    }
};
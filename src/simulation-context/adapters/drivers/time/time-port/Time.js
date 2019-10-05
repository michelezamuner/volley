/**
 * @package SimulationContext.Adapters.Drivers.Time.TimePort
 * @requires SimulationContext.Application.TimePort.SimulationTime
 * @requires Time.SimpleTime
 * @implements SimulationTime
 */
module.exports = class Time {
    /**
     * @param {SimpleTime} time 
     */
    constructor(time) {
        this._time = time;
    }

    /**
     * @override
     */
    getCurrentTimeInSeconds() {
        return this._time.now();
    }
};
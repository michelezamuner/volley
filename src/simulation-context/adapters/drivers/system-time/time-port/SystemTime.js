const SimpleTime = require('../../../../../../lib/time/SimpleTime');

/**
 * @package SimulationContext.Adapters.Drivers.SystemTime.TimePort
 * @requires SimulationContext.Application.TimePort.SimulationTime
 * @requires Time.SimpleTime
 * @implements SimulationTime
 */
module.exports = class SystemTime {
    constructor() {
        this._time = new SimpleTime();
    }

    /**
     * @override
     */
    getCurrentTimeInSeconds() {
        return this._time.now();
    }
};
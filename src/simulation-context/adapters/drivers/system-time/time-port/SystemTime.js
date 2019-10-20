/**
 * @package SimulationContext.Adapters.Drivers.SystemTime.TimePort
 * @requires Process
 * @requires SimulationContext.Application.TimePort.SimulationTime
 * @implements SimulationTime
 */
module.exports = class SystemTime {
    /**
     * @param {Process} process 
     */
    constructor(process) {
        this._process = process;
    }
    /**
     * @override
     */
    getProgressiveTime() {
        return Number(this._process.hrtime.bigint()) / 1000000000;
    }
};
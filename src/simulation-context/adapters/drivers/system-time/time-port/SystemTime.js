/**
 * @package SimulationContext.Adapters.Drivers.SystemTime.TimePort
 * @requires SimulationContext.Application.TimePort.SimulationTime
 * @implements SimulationTime
 */
module.exports = class SystemTime {
    /**
     * @override
     */
    getProgressiveTime() {
        const timeData = process.hrtime();

        return timeData[0] + timeData[1] / 1000000000;
    }
};
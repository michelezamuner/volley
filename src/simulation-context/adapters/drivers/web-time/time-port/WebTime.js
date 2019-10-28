/**
 * @package SimulationContext.Adapters.Drivers.WebTime.TimePort
 * @requires SimulationContext.Application.TimePort.SimulationTime
 * @requires window
 * @implements SimulationTime
 */
module.exports = class WebTime {
    /**
     * @override
     */
    getProgressiveTime() {
        return window.performance.now() / 1000;
    }
};
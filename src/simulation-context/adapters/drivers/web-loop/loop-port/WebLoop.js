/**
 * @package SimulationContext.Adapters.Drivers.WebLoop.LoopPort
 * @requires SimulationContext.Application.LoopPort.SimulationLoop
 * @implements SimulationLoop
 */
module.exports = class WebLoop {
    /**
     * @override
     */
    run(callback) {
        callback();
        setTimeout(() => this.run(callback), 0);
    }
};
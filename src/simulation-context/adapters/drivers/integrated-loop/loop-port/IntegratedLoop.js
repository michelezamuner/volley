/**
 * @package SimulationContext.Adapters.Drivers.IntegratedLoop.LoopPort
 * @requires SimulationContext.Application.LoopPort.SimulationLoop
 * @implements SimulationLoop
 */
module.exports = class IntegratedLoop {
    /**
     * @override
     */
    run(callback) {
        callback();
        setImmediate(() => this.run(callback));
    }
};
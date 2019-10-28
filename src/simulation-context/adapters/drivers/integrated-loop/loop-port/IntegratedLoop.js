/**
 * @package SimulationContext.Adapters.Drivers.IntegratedLoop.LoopPort
 * @requires SimulationContext.Application.LoopPort.Loop
 * @implements Loop
 */
module.exports = class IntegratedLoop {
    /**
     * @override
     */
    run(callback) {
        callback();
        setImmediate(() => this.run.call(this, callback));
    }
};
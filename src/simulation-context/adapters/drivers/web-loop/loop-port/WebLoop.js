/**
 * @package SimulationContext.Adapters.Drivers.WebLoop.LoopPort
 * @requires SimulationContext.Application.LoopPort.Loop
 * @implements Loop
 */
module.exports = class WebLoop {
    /**
     * @override
     */
    run(callback) {
        callback();
        setTimeout(() => this.run.call(this, callback), 0);
    }
};
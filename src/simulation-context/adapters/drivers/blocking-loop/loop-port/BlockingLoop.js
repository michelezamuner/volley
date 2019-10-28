/**
 * @package SimulationContext.Adapters.Drivers.BlockingLoop.LoopPort
 * @requires SimulationContext.Application.LoopPort.Loop
 * @implements Loop
 */
module.exports = class BlockingLoop {
    /**
     * @override
     */
    run(callback) {
        while (true) {
            callback();
        }
    }
};
/**
 * @package SimulationContext.Adapters.Drivers.BlockingLoop.LoopPort
 * @requires SimulationContext.Application.LoopPort.SimulationLoop
 * @implements SimulationLoop
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
/**
 * @package SimulationContext.Adapters.LoggingConsoleClient.SimulationPort.RunSimulationUseCase
 * @interface Time
 * @method now(): {number}
 */
module.exports = class Time {
    /**
     * @const {number}
     */
    static get SECOND() { return 1000; }
};
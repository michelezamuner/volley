/**
 * @package SimulationContext.Adapters.TimeDriver
 * @requires SimulationContext.Domain.Physics.TimeProvider
 * @requires SimulationContext.Adapters.LoggingConsoleClient.SimulationPort.RunSimulationUseCase.Presenters.Time
 * @implements TimeProvider
 * @implements Time
 */
module.exports = class Time {
    /**
     * @override
     */
    now() {
        return Math.floor(Date.now());
    }

    /**
     * @override
     */
    getSecond() {
        return 1000;
    }
};
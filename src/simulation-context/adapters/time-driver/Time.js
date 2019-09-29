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
    getCurrentTimeInSeconds() {
        const timeData = process.hrtime();

        return timeData[0] + timeData[1] / 1000000000;
    }
    
    /**
     * @override
     */
    now() {
        return this.getCurrentTimeInSeconds();
    }
};
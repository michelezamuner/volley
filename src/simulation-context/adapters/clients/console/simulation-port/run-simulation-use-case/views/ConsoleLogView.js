/**
 * @package SimulationContext.Adapters.LoggingConsoleClient.SimulationPort.RunSimulationUseCase.Views
 * @requires SimulationContext.Adapters.LoggingConsoleClient.SimulationPort.RunSimulationUseCase.Presenters.TimedPresenterView
 * @implements TimedPresenterView
 */
module.exports = class ConsoleLogView {
    /**
     * @override
     */
    render(position) {
        process.stdout.write(position + '\n');
    }
};
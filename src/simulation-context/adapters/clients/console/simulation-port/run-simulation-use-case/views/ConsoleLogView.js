/**
 * @package SimulationContext.Adapters.Clients.Console.SimulationPort.RunSimulationUseCase.Views
 * @requires SimulationContext.Adapters.Clients.Console.SimulationPort.RunSimulationUseCase.Presenters.TimedPresenterView
 * @implements TimedView
 */
module.exports = class ConsoleLogView {
    /**
     * @override
     */
    render(position) {
        process.stdout.write(position + '\n');
    }
};
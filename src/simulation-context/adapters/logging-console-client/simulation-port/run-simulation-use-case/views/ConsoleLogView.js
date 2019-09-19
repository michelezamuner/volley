/**
 * @package SimulationContext.Adapters.LoggingConsoleClient.SimulationPort.RunSimulationUseCase.Views
 * @requires SimulationContext.Adapters.LoggingConsoleClient.SimulationPort.RunSimulationUseCase.Presenters.TimedPresenterView
 * @requires SimulationContext.Adapters.LoggingConsoleClient.SimulationPort.RunSimulationUseCase.Views.Console;
 * @implements TimedPresenterView
 */
module.exports = class ConsoleLogView {
    /**
     * @param {Console} console 
     */
    constructor(console) {
        this._console = console;
    }
    
    /**
     * @override
     */
    render(position) {
        this._console.writeOutputLn(position);
    }
};
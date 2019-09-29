/**
 * @package SimulationContext.Adapters.LoggingConsoleClient.Main
 * @requires SimulationContext.Adapters.LoggingConsoleClient.SimulationPort.RunSimulationUseCase.Views.Console
 * @implements Console
 */
module.exports = class Console {
    /**
     * @override
     */
    writeOutputLn(text) {
        process.stdout.write(text + '\n');
    }
};
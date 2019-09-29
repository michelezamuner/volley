/**
 * @package SimulationContext.Adapters.LoggingConsoleClient.SimulationPort.RunSimulationUseCase.Presenters
 * @requires SimulationContext.Adapters.LoggingConsoleClient.SimulationPort.RunSimulationUseCase.Presenters.TimedPresenterView
 * @requires SimulationContext.Adapters.LoggingConsoleClient.SimulationPort.RunSimulationUseCase.Presenters.Time
 * @requires SimulationContext.Application.SimulationPort.RunSimulationUseCase.SimulationPresenter
 * @implements SimulationPresenter
 */
module.exports = class TimedPresenter {
    /**
     * @param {TimedPresenterView} view 
     * @param {Time} time 
     */
    constructor(view, time) {
        this._view = view;
        this._time = time;
        this._lastIntervalStart = null;
    }
    
    /**
     * @override
     */
    present(position) {
        if (this._lastIntervalStart === null) {
            this._lastIntervalStart = this._time.now();
            this._view.render(position);

            return;
        }

        const step = 1;
        if (this._time.now() >= this._lastIntervalStart + step) {
            this._lastIntervalStart += step;
            this._view.render(position);
        }
    }
};
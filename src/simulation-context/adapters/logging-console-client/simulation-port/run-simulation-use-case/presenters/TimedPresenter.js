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
        this._start = time.now();
        this._hasStarted = false;
    }
    
    /**
     * @override
     */
    present(position) {
        if (!this._hasStarted) {
            this._hasStarted = true;
            this._view.render(position);
        }
        const now = this._time.now();
        if (now >= this._start + this._time.getSecond()) {
            this._view.render(position);
            this._start = now;
        }
    }
};
const Time = require('./Time');

/**
 * @package SimulationContext.Adapters.LoggingConsoleClient.SimulationPort.RunSimulationUseCase
 * @requires SimulationContext.Adapters.LoggingConsoleClient.SimulationPort.RunSimulationUseCase.TimedPresenterView
 * @requires SimulationContext.Adapters.LoggingConsoleClient.SimulationPort.RunSimulationUseCase.Time
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
    }
    
    /**
     * @override
     */
    present(position) {
        const now = this._time.now();
        if (now >= this._start + Time.SECOND) {
            this._view.render(position);
            this._start = now;
        }
    }
};
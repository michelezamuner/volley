/**
 * @package SimulationContext.Adapters.LoggingConsoleClient.SimulationPort.RunSimulationUseCase.Presenters
 * @requires SimulationContext.Adapters.LoggingConsoleClient.SimulationPort.RunSimulationUseCase.Presenters.TimedPresenterView
 * @requires SimulationContext.Application.SimulationPort.RunSimulationUseCase.SimulationPresenter
 * @requires SimulationContext.Application.TimePort.SimulationTime
 * @implements SimulationPresenter
 */
module.exports = class TimedPresenter {
    /**
     * @param {TimedPresenterView} view 
     * @param {SimulationTime} time 
     */
    constructor(view, time) {
        this._view = view;
        this._time = time;
        this._lastIntervalStart = null;
    }
    
    /**
     * @override
     */
    present(response) {
        if (this._lastIntervalStart === null) {
            this._lastIntervalStart = this._time.getProgressiveTime();
            this._view.render(response.getFrame().getBall().getPosition());

            return;
        }

        const step = 1;
        if (this._time.getProgressiveTime() >= this._lastIntervalStart + step) {
            this._lastIntervalStart += step;
            this._view.render(response.getFrame().getBall().getPosition());
        }
    }
};
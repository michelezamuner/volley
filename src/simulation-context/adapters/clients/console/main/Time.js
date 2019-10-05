/**
 * @package SimulationContext.Adapters.Clients.Console.Main
 * @requires SimulationContext.Adapters.Clients.Console.SimulationPort.RunSimulationUseCase.Presenters.Time as PresenterTime
 * @requires Time.SimpleTime
 * @implements PresenterTime
 */
module.exports = class Time {
    /**
     * @param {SimpleTime} time 
     */
    constructor(time) {
        this._time = time;
    }

    /**
     * @override
     */
    now() {
        return this._time.now();
    }
};
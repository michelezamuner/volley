const SimpleTime = require('../../../../../../../../lib/time/SimpleTime');

/**
 * @package SimulationContext.Adapters.Clients.Console.SimulationPort.RunSimulationUseCase.Presenters
 * @requires SimulationContext.Adapters.Clients.Console.SimulationPort.RunSimulationUseCase.Presenters.Time
 * @requires Time.SimpleTime
 * @implements Time
 */
module.exports = class PresenterTime {
    constructor() {
        this._time = new SimpleTime();
    }

    /**
     * @override
     */
    now() {
        return this._time.now();
    }
};
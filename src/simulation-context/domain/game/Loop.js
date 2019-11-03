/**
 * @package SimulationContext.Domain.Game
 * @requires SimulationContext.Domain.Game.LoopProvider
 * @requires SimulationContext.Domain.Physics.Time
 */
module.exports = class Loop {
    /**
     * @param {LoopProvider} provider 
     * @param {Time} time 
     */
    constructor(provider, time) {
        this._provider = provider;
        this._time = time;
    }

    /**
     * @param {Function} callback 
     */
    start(callback) {
        this._time.reset();
        this._provider.run(() => callback(this._time.elapsed()));
    }
};
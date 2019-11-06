/**
 * @package SimulationContext.Domain.Simulation
 * @requires SimulationContext.Domain.Simulation.TimeProvider
 */
module.exports = class Time {
    /**
     * @param {TimeProvider} provider 
     */
    constructor(provider) {
        this._provider = provider;

        /**
         * @var {null|Number}
         */
        this._lastIntervalStart = null;
    }

    reset() {
        this._lastIntervalStart = this._provider.getProgressiveTime();
    }

    /**
     * @throws
     */
    elapsed() {
        if (this._lastIntervalStart === null) {
            throw 'Cannot use time that has not been reset';
        }

        const current = this._provider.getProgressiveTime();
        const interval = current - this._lastIntervalStart;
        this._lastIntervalStart = current;

        return interval;
    }
};
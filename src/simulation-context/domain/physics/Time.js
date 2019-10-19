/**
 * @package SimulationContext.Domain.Physics
 * @requires SimulationContext.Domain.Physics.TimeProvider
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

    /**
     * @throws
     */
    start() {
        if (this.isRunning()) {
            throw 'Cannot start again time that is already running';
        }
        this._lastIntervalStart = this._provider.getProgressiveTime();
    }

    /**
     * @return {bool}
     */
    isRunning() {
        return this._lastIntervalStart !== null;
    }

    /**
     * @throws
     */
    tick() {
        if (!this.isRunning()) {
            throw 'Cannot use time that is not running';
        }

        const current = this._provider.getProgressiveTime();
        const interval = current - this._lastIntervalStart;
        this._lastIntervalStart = current;

        return interval;
    }
};
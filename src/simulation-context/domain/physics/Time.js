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
        this._start = null;
    }

    start() {
        if (this.isRunning()) {
            throw 'Cannot start again time that is already running';
        }
        this._start = this._provider.getCurrentTimeInSeconds();
    }

    /**
     * @return {bool}
     */
    isRunning() {
        return this._start !== null;
    }

    /**
     * @return {number}
     */
    current() {
        if (!this.isRunning()) {
            throw 'Cannot use time that is not running';
        }
        
        return this._provider.getCurrentTimeInSeconds() - this._start;
    }
};
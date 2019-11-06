const Simulation = require('./Simulation');

/**
 * @package SimulationContext.Domain.Simulation
 * @requires SimulationContext.Domain.Simulation.Simulation
 * @requires SimulationContext.Domain.Physics.Physics
 * @requires SimulationContext.Domain.Simulation.Options
 */
module.exports = class SimulationFactory {
    /**
     * @param {physics} physics 
     */
    constructor(physics) {
        this._physics = physics;
    }

    /**
     * @param {Options} options 
     */
    create(options) {
        return new Simulation(options, this._physics);
    }
};
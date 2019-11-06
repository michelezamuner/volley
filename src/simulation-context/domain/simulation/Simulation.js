const Constant = require('../physics/Constant');

/**
 * @package SimulationService.Domain.Simulation
 * @requires SimulationService.Domain.Physics.Constant
 * @requires SimulationService.Domain.Simulation.Options
 * @requires SimulationService.Domain.Physics.Physics
 */
module.exports = class Simulation {
    /**
     * @param {Options} options 
     * @param {Physics} physics 
     */
    constructor(options, physics) {
        if (options.getBallMass() === null || options.getBallPosition() === null) {
            throw 'Missing required options';
        }

        this._physics = physics;
        this._ball = this._physics.addBody(
            options.getBallMass(),
            options.getBallElasticity(),
            options.getBallPosition()
        );
        this._physics.addField(-1 * options.getBallMass() * Constant.G);

        if (options.getFloorPosition() !== null) {
            this._physics.addConstraint(options.getFloorPosition());
        }

        if (options.getAirViscosity() !== null) {
            this._physics.addDrag(options.getAirViscosity());
        }
    }

    /**
     * @param {Number} interval 
     */
    update(interval) {
        this._physics.resolve(interval);
    }

    /**
     * @return {Number}
     */
    getBallPosition() {
        return this._ball.getPosition();
    }
};
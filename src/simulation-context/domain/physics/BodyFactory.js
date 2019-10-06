const Physics = require('./Physics');
const ActionableBody = require('./ActionableBody');
const ActionableConstraint = require('./ActionableConstraint');

/**
 * @package SimulationContext.Domain.Physics
 * @requires SimulationContext.Domain.Physics.Physics
 * @requires SimulationContext.Domain.Physics.Body
 * @requires SimulationContext.Domain.Physics.Constraint
 * @requires SimulationContext.Domain.Physics.ActionableBody
 * @requires SimulationContext.Domain.Physics.ActionableConstraint
 */
module.exports = class BodyFactory {
    /**
     * @return {Physics}
     */
    createPhysics() {
        return new Physics();
    }
    /**
     * @param {number} mass
     * @param {number} position
     * @return {Body}
     */
    createBody(mass, position) {
        return new ActionableBody(mass, position);
    }

    /**
     * @param {number} position
     * @return {Constraint}
     */
    createConstraint(position) {
        return new ActionableConstraint(position);
    }
};
const Physics = require('./Physics');
const ActionableBody = require('./ActionableBody');
const ActionableConstraint = require('./ActionableConstraint');
const ActionableDrag = require('./ActionableDrag');

/**
 * @package SimulationContext.Domain.Physics
 * @requires SimulationContext.Domain.Physics.Physics
 * @requires SimulationContext.Domain.Physics.Body
 * @requires SimulationContext.Domain.Physics.Constraint
 * @requires SimulationContext.Domain.Physics.Drag
 * @requires SimulationContext.Domain.Physics.ActionableBody
 * @requires SimulationContext.Domain.Physics.ActionableConstraint
 * @requires SimulationContext.Domain.Physics.ActionableDrag
 */
module.exports = class PhysicsFactory {
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

    /**
     * @param {Number} viscosity
     * @return {Drag}
     */
    createDrag(viscosity) {
        return new ActionableDrag(viscosity);
    }
};
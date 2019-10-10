const Physics = require('./Physics');
const ActionableBody = require('./ActionableBody');
const ActionableField = require('./ActionableField');
const ActionableConstraint = require('./ActionableConstraint');
const ActionableDrag = require('./ActionableDrag');

/**
 * @package SimulationContext.Domain.Physics
 * @requires SimulationContext.Domain.Physics.Physics
 * @requires SimulationContext.Domain.Physics.Body
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
     * @param {Number} mass
     * @param {Number} elasticity
     * @param {Number} pos
     * @return {ActionableBody}
     */
    createBody(mass, elasticity, pos) {
        return new ActionableBody(mass, elasticity, pos);
    }

    /**
     * @param {Number} force
     * @return {ActionableField}
     */
    createField(force) {
        return new ActionableField(force);
    }

    /**
     * @param {Number} pos
     * @return {ActionableConstraint}
     */
    createConstraint(pos) {
        return new ActionableConstraint(pos);
    }

    /**
     * @param {Number} viscosity
     * @return {ActionableDrag}
     */
    createDrag(viscosity) {
        return new ActionableDrag(viscosity);
    }
};
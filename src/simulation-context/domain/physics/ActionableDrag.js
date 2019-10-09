/**
 * @package SimulationContext.Domain.Physics
 * @requires SimulationContext.Domain.Physics.ActionableBody
 */
module.exports = class ActionableDrag {
    /**
     * @param {Number} viscosity 
     */
    constructor(viscosity) {
        this._viscosity = viscosity;
    }

    /**
     * @param {ActionableBody} body
     */
    apply(body) {
        body.apply(-this._viscosity * body.getVelocity());
    }
};
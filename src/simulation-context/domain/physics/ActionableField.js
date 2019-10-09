/**
 * @package SimulationContext.Domain.Physics
 * @requires SimulationContext.Domain.Physics.ActionableBody
 */
module.exports = class ActionableField {
    /**
     * @param {Number} force 
     */
    constructor(force) {
        this._force = force;
    }

    /**
     * @param {ActionableBody} body 
     */
    apply(body) {
        body.apply(this._force);
    }
};
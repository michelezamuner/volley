/**
 * @package SimulationContext.Domain.Physics
 * @requires SimulationContext.Domain.Physics.Drag
 * @requires SimulationContext.Domain.Physics.Body
 * @implements Drag
 */
module.exports = class ActionableDrag {
    /**
     * @param {Number} viscosity 
     */
    constructor(viscosity) {
        this._viscosity = viscosity;
    }

    /**
     * @param {Body} body
     */
    apply(body) {
        body.apply(-this._viscosity * body.getVelocity());
    }
};
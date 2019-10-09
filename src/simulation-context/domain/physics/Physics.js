/**
 * @package SimulationContext.Domain.Physics
 * @requires SimulationContext.Domain.Physics.ActionableBody
 * @requires SimulationContext.Domain.Physics.ActionableConstraint
 * @requires SimulationContext.Domain.Physics.ActionableDrag
 */
module.exports = class Physics {
    /**
     * @const {int}
     */
    static get G() { return -9.8066; }
    
    constructor() {
        this._field = null;
        this._body = null;
        this._constraint = null;
        this._drag = null;
    }

    /**
     * @param {number} field 
     */
    setField(field) {
        this._field = field;
    }

    /**
     * @param {ActionableBody} body 
     */
    setBody(body) {
        this._body = body;
    }

    /**
     * @param {ActionableConstraint} constraint 
     */
    setConstraint(constraint) {
        this._constraint = constraint;
    }

    /**
     * @param {ActionableDrag} drag 
     */
    setDrag(drag) {
        this._drag = drag;
    }

    /**
     * @param {number} interval 
     */
    resolve(interval) {
        this._body.apply(this._field);
        if (this._constraint) {
            this._constraint.apply(this._body, interval);
        }
        if (this._drag) {
            this._drag.apply(this._body);
        }
        this._body.resolve(interval);
    }
};
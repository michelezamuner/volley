/**
 * @package SimulationContext.Domain.Physics
 * @requires SimulationContext.Domain.Physics.ActionableBody
 * @requires SimulationContext.Domain.Physics.ActionableConstraint
 */
module.exports = class Physics {
    constructor() {
        this._field = null;
        this._body = null;
        this._constraint = null;
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
     * @param {number} interval 
     */
    resolve(interval) {
        this._body.apply(this._field);
        if (this._constraint) {
            this._constraint.apply(this._body, interval);
        }
        this._body.resolve(interval);
    }
};
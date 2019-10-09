/**
 * @package SimulationContext.Domain.Physics
 * @requires SimulationContext.Domain.Physics.PhysicsFactory
 * @requires SimulationContext.Domain.Physics.Body
 * @requires SimulationContext.Domain.Physics.ActionableBody
 * @requires SimulationContext.Domain.Physics.ActionableField
 * @requires SimulationContext.Domain.Physics.ActionableConstraint
 * @requires SimulationContext.Domain.Physics.ActionableDrag
 */
module.exports = class Physics {
    /**
     * @param {PhysicsFactory} factory 
     */
    constructor(factory) {
        this._factory = factory;

        /**
         * @var {null|ActionableBody}
         */
        this._body = null;

        /**
         * @var {null|ActionableField}
         */
        this._field = null;

        /**
         * @var {null|ActionableConstraint}
         */
        this._constraint = null;

        /**
         * @var {null|ActionableDrag}
         */
        this._drag = null;
    }

    /**
     * @param {Number} mass
     * @param {Number} pos
     * @return {Body}
     */
    addBody(mass, pos) {
        this._body = this._factory.createBody(mass, pos);

        return this._body;
    }

    /**
     * @param {Number} force
     */
    addField(force) {
        this._field = this._factory.createField(force);
    }

    /**
     * @param {Number} pos
     */
    addConstraint(pos) {
        this._constraint = this._factory.createConstraint(pos);
    }

    /**
     * @param {Number} viscosity 
     */
    addDrag(viscosity) {
        this._drag = this._factory.createDrag(viscosity);
    }

    /**
     * @param {Number} interval 
     */
    resolve(interval) {
        if (this._field) {
            this._field.apply(this._body);
        }
        if (this._constraint) {
            this._constraint.apply(this._body, interval);
        }
        if (this._drag) {
            this._drag.apply(this._body);
        }

        this._body.resolve(interval);
    }
};
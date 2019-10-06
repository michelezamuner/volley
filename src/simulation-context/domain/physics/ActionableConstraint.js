/**
 * @package SimulationContext.Domain.Physics
 * @requires SimulationContext.Domain.Physics.Constraint
 * @requires SimulationContext.Domain.Physics.Body
 * @implements Constraint
 */
module.exports = class ActionableConstraint {
    /**
     * @param {number} position 
     */
    constructor(position = 0) {
        this._position = position;
    }

    /**
     * @override
     */
    getPosition() {
        return this._position;
    }

    /**
     * @param {Body} body 
     * @param {number} interval 
     */
    apply(body, interval) {
        if (body.getPosition() > this._position) {
            return;
        }

        const impulse = -2 * body.getMass() * body.getVelocity() / interval;
        body.apply(impulse);
    }
};
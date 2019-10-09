/**
 * @package SimulationContext.Domain.Physics
 * @requires SimulationContext.Domain.Physics.Body
 */
module.exports = class ActionableConstraint {
    /**
     * @param {Number} position 
     */
    constructor(position) {
        this._position = position;
    }

    /**
     * @param {Body} body 
     * @param {Number} interval 
     */
    apply(body, interval) {
        if (body.getPosition() > this._position) {
            return;
        }

        const impulse = -2 * body.getMass() * body.getVelocity() / interval;
        body.apply(impulse);
    }
};
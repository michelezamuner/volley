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
        if (body.getPosition() > this._position || body.getVelocity() > 0) {
            return;
        }

        const impulse = -1 * body.getMass() * body.getVelocity() * (1 + body.getElasticity()) / interval;
        body.apply(impulse);
    }
};
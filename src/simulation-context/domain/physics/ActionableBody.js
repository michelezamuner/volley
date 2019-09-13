/**
 * @package SimulationContext.Domain.Physics
 * @requires SimulationContext.Domain.Physics.Body
 * @implements Body
 */
module.exports = class ActionableBody {
    /**
     * @param {number} mass
     * @param {number} position
     * @param {number} velocity
     * @param {number} acceleration
     */
    constructor(mass, position = 0, velocity = 0, acceleration = 0) {
        this._mass = mass;
        this._position = position;
        this._velocity = velocity;
        this._acceleration = acceleration;
    }

    /**
     * @override
     */
    getMass() {
        return this._mass;
    }

    /**
     * @override
     */
    getPosition() {
        return this._position;
    }

    /**
     * @override
     */
    getVelocity() {
        return this._velocity;
    }

    /**
     * @override
     */
    getAcceleration() {
        return this._acceleration;
    }

    /**
     * @param {number} force 
     * @param {number} time 
     */
    apply(force, time) {
        this._acceleration += force / this._mass;
        this._velocity += this._acceleration * time;
        this._position += this._velocity * time;
    }
};
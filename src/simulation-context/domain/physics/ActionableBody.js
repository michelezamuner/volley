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
     */
    constructor(mass, position = 0, velocity = 0) {
        this._mass = mass;
        this._position = position;
        this._velocity = velocity;
        this._acceleration = 0;
        this._force = 0;
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
     */
    apply(force) {
        this._force += force;
    }

    /**
     * @param {number} interval
     */
    resolve(interval) {
        this._acceleration = this._force / this._mass;
        this._velocity += this._acceleration * interval;
        this._position += this._velocity * interval;
        this._force = 0;
    }
};
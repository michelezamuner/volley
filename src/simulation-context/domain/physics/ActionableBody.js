/**
 * @package SimulationContext.Domain.Physics
 * @requires SimulationContext.Domain.Physics.Body
 * @implements Body
 */
module.exports = class ActionableBody {
    /**
     * @param {Number} mass
     * @param {Number} position
     * @param {Number} velocity
     */
    constructor(mass, position = 0, velocity = 0) {
        this._mass = mass;
        this._position = position;
        this._velocity = velocity;

        /**
         * @var {Number}
         */
        this._acceleration = 0;

        /**
         * @var {Number}
         */
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
     * @param {Number} force
     */
    apply(force) {
        this._force += force;
    }

    /**
     * @param {Number} interval
     */
    resolve(interval) {
        this._acceleration = this._force / this._mass;
        this._velocity += this._acceleration * interval;
        this._position += this._velocity * interval;
        this._force = 0;
    }
};
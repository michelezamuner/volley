const ActionableBody = require('./ActionableBody');

/**
 * @package SimulationContext.Domain.Physics
 * @requires SimulationContext.Domain.Physics.Body
 * @requires SimulationContext.Domain.Physics.ActionableBody
 */
module.exports = class BodyFactory {
    /**
     * @param {number} mass
     * @param {number} position
     * @return {Body}
     */
    create(mass, position) {
        return new ActionableBody(mass, position);
    }
};
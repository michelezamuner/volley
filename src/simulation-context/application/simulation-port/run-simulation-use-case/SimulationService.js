const Constant = require('../../../domain/physics/Constant');

/**
 * @package SimulationContext.Application.SimulationPort.RunSimulationUseCase
 * @requires SimulationContext.Application.ConfigurationPort.Configuration
 * @requires SimulationContext.Domain.Physics.Physics
 * @requires SimulationContext.Domain.Physics.Body
 * @requires SimulationContext.Domain.Physics.Time
 */
module.exports = class SimulationService {
    /**
     * @param {Configuration} conf
     * @param {Physics} physics
     * @param {Time} time
     */
    constructor(conf, physics, time) {
        this._conf = conf;
        this._physics = physics;
        this._time = time;
    }

    /**
     * @param {Function} callback 
     */
    run(callback) {
        /** @type {Body} */
        const ball = this._physics.addBody(this._conf.getBallMass(), this._conf.getBallPos());
        this._physics.addField(-this._conf.getBallMass() * Constant.G);
        if (this._conf.getFloorPos() !== null) {
            this._physics.addConstraint(this._conf.getFloorPos());
        }
        if (this._conf.getAirViscosity() !== null) {
            this._physics.addDrag(this._conf.getAirViscosity());
        }

        this._time.start();
        while (this._time.isRunning()) {
            callback(ball);
            this._physics.resolve(this._time.tick());
        }
    }
};

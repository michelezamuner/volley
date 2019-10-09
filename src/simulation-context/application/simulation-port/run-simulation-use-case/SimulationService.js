const Physics = require('../../../domain/physics/Physics');

/**
 * @package SimulationContext.Application.SimulationPort.RunSimulationUseCase
 * @requires SimulationContext.Application.ConfigurationPort.Configuration
 * @requires SimulationContext.Domain.Physics.BodyFactory
 * @requires SimulationContext.Domain.Physics.Body
 * @requires SimulationContext.Domain.Physics.Time
 * @requires SimulationContext.Domain.Physics.Physics
 */
module.exports = class SimulationService {
    /**
     * @param {Configuration} conf
     * @param {BodyFactory} factory
     * @param {Time} time
     */
    constructor(conf, factory, time) {
        this._conf = conf;
        this._factory = factory;
        this._time = time;
    }

    /**
     * @param {Function} callback 
     */
    run(callback) {
        /** @type {Physics} */
        const physics = this._factory.createPhysics();
        /** @type {Body} */
        const ball = this._factory.createBody(this._conf.getBallMass(), this._conf.getBallPos());

        physics.setField(this._conf.getBallMass() * Physics.G);
        physics.setBody(ball);
        if (this._conf.getFloorPos() !== null) {
            physics.setConstraint(this._factory.createConstraint(this._conf.getFloorPos()));
        }
        if (this._conf.getAirViscosity() !== null) {
            physics.setDrag(this._factory.createDrag(this._conf.getAirViscosity()));
        }

        this._time.start();
        while (this._time.isRunning()) {
            callback(ball);
            physics.resolve(this._time.tick());
        }
    }
};

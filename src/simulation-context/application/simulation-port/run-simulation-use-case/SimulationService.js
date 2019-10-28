const Constant = require('../../../domain/physics/Constant');
const Frame = require('./Frame');

/**
 * @package SimulationContext.Application.SimulationPort.RunSimulationUseCase
 * @requires SimulationContext.Application.ConfigurationPort.Configuration
 * @requires SimulationContext.Application.SimulationPort.RunSimulationUseCase.Frame
 * @requires SimulationContext.Domain.Physics.Physics
 * @requires SimulationContext.Domain.Physics.Body
 * @requires SimulationContext.Domain.Physics.Time
 * @requires SimulationContext.Application.LoopPort.Loop
 */
module.exports = class SimulationService {
    /**
     * @param {Configuration} conf
     * @param {Physics} physics
     * @param {Time} time
     * @param {Loop} loop
     */
    constructor(conf, physics, time, loop) {
        this._conf = conf;
        this._physics = physics;
        this._time = time;
        this._loop = loop;
    }

    /**
     * @param {Function} callback 
     */
    run(callback) {
        /** @type {Body} */
        const ball = this._physics.addBody(this._conf.getBallMass(), this._conf.getBallElasticity(), this._conf.getBallPos());
        this._physics.addField(-this._conf.getBallMass() * Constant.G);
        if (this._conf.getFloorPos() !== null) {
            this._physics.addConstraint(this._conf.getFloorPos());
        }
        if (this._conf.getAirViscosity() !== null) {
            this._physics.addDrag(this._conf.getAirViscosity());
        }

        this._time.start();
        this._loop.run(() => {
            callback(new Frame(ball.getPosition(), this._conf.getFloorPos()));
            this._physics.resolve(this._time.tick());
        });
    }
};

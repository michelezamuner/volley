/**
 * @package SimulationContext.Application.SimulationPort.RunSimulationUseCase
 * @requires SimulationContext.Application.ConfigurationPort.Configuration
 * @requires SimulationContext.Domain.Physics.BodyFactory
 * @requires SimulationContext.Domain.Physics.Body
 * @requires SimulationContext.Domain.Physics.Constraint
 * @requires SimulationContext.Domain.Physics.Time
 * @requires SimulationContext.Domain.Physics.Physics
 */
module.exports = class SimulationService {
    /**
     * @const {int}
     */
    static get G() { return -9.8066; }

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
        const physics = this._factory.createPhysics();
        /** @type {Body} */
        const ball = this._factory.createBody(this._conf.getBallMass(), this._conf.getBallPos());

        physics.setField(this._conf.getBallMass() * SimulationService.G);
        physics.setBody(ball);
        if (this._conf.getFloorPos() !== null) {
            physics.setConstraint(this._factory.createConstraint(this._conf.getFloorPos()));
        }

        this._time.start();
        let lastIntervalStart = 0;
        callback(ball);
        
        while (this._time.isRunning()) {
            const current = this._time.current();
            const interval = current - lastIntervalStart;
            lastIntervalStart = current;
            physics.resolve(interval);
            
            callback(ball);
        }
    }
};

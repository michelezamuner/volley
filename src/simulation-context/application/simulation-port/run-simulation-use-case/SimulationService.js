/**
 * @package SimulationContext.Application.SimulationPort.RunSimulationUseCase
 * @requires SimulationContext.Application.ConfigurationPort.Configuration
 * @requires SimulationContext.Domain.Physics.BodyFactory
 * @requires SimulationContext.Domain.Physics.Body
 * @requires SimulationContext.Domain.Physics.Time
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
        /** @type {Body} */
        const ball = this._factory.create(this._conf.getBallMass(), this._conf.getBallPos());
        const gravity = this._conf.getBallMass() * SimulationService.G;

        this._time.start();
        let lastIntervalStart = 0;
        callback(ball);
        
        while (this._time.isRunning()) {
            const current = this._time.current();
            const interval = current - lastIntervalStart;
            lastIntervalStart = current;
            ball.apply(gravity, interval);
            
            callback(ball);
        }
    }
};

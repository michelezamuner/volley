/**
 * @package SimulationContext.Application.SimulationPort.RunSimulationUseCase
 * @requires SimulationContext.Domain.Physics.BodyFactory
 * @requires SimulationContext.Domain.Physics.Body
 * @requires SimulationContext.Domain.Physics.Time
 */
module.exports = class SimulationService {
    /**
     * @const {int}
     */
    static get BALL_MASS() { return 5; }

    /**
     * @const {int}
     */
    static get BALL_POS() { return 100; }

    /**
     * @const {int}
     */
    static get G() { return 9.8066; }

    /**
     * @param {BodyFactory} factory
     * @param {Time} time
     */
    constructor(factory, time) {
        this._factory = factory;
        this._time = time;
    }

    /**
     * @param {Function} callback 
     */
    run(callback) {
        /** @type {Body} */
        const ball = this._factory.create(SimulationService.BALL_MASS, SimulationService.BALL_POS);
        const gravity = SimulationService.BALL_MASS * SimulationService.G;

        this._time.start();
        let stepStart = 0;
        while (this._time.isRunning()) {
            const current = this._time.current();
            const interval = current - stepStart;
            stepStart = current;
            ball.apply(gravity, interval);

            callback(ball);
        }
    }
};

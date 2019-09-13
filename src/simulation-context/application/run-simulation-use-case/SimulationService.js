/**
 * @package SimulationContext.Application.RunSimulationUseCase
 * @requires SimulationContext.Domain.Physics.BodyFactory
 * @requires SimulationContext.Domain.Physics.Body
 * @requires SimulationContext.Application.RunSimulationUseCase.TimeProvider
 */
module.exports = class SimulationService {
    /** @const {int} */
    static get BALL_MASS() { return 5; }

    /** @const {int} */
    static get BALL_POS() { return 100; }

    /** @const {int} */
    static get G() { return 9.8066; }

    /** @const {int} */
    static get RESOLUTION() { return 0.001; }

    /**
     * @param {BodyFactory} factory
     * @param {TimeProvider} time
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

        let stepStart = this._time.now();
        this._time.loop(SimulationService.RESOLUTION, stepTime => {
            ball.apply(gravity, SimulationService.RESOLUTION);
            if (stepTime >= stepStart + this._time.SECOND) {
                callback(ball);
                stepStart = stepTime;
            }
        });
    }
};
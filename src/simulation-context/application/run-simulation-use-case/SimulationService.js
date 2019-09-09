/**
 * @package SimulationContext.Application.RunSimulationUseCase
 * @requires SimulationContext.Domain.Physics.BodyFactory
 * @requires SimulationContext.Domain.Physics.Physics
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
     * @param {Physics} physics 
     * @param {TimeProvider} time 
     */
    constructor(factory, physics, time) {
        this._factory = factory;
        this._physics = physics;
        this._time = time;
    }

    /**
     * @param {Function} callback 
     */
    run(callback) {
        const ball = this._factory.create(SimulationService.BALL_MASS, SimulationService.BALL_POS);
        this._physics.addBody(ball);

        const gravity = SimulationService.BALL_MASS * SimulationService.G;
        this._physics.applyForce(gravity);

        let stepStart = this._time.now();
        this._time.loop(SimulationService.RESOLUTION, stepTime => {
            this._physics.processStep(SimulationService.RESOLUTION);
            if (stepTime >= stepStart + this._time.SECOND) {
                callback(this._physics);
                stepStart = stepTime;
            }
        });
    }
};
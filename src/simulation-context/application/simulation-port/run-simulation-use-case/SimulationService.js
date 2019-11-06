const Frame = require('./Frame');
const Options = require('../../../domain/simulation/Options');

/**
 * @package SimulationContext.Application.SimulationPort.RunSimulationUseCase
 * @requires SimulationContext.Application.SimulationPort.RunSimulationUseCase.Frame
 * @requires SimulationContext.Domain.Simulation.Options
 * @requires SimulationContext.Domain.Simulation.SimulationFactory
 * @requires SimulationContext.Domain.Simulation.Simulation
 * @requires SimulationContext.Domain.Simulation.Loop
 */
module.exports = class SimulationService {
    /**
     * @param {SimulationFactory} factory
     * @param {Loop} loop
     */
    constructor(factory, loop) {
        this._factory = factory;
        this._loop = loop;
    }

    /**
     * @param {Options} options
     * @param {Function} callback 
     */
    run(options, callback) {
        /** @type {Simulation} */
        const simulation = this._factory.create(options);
        
        this._loop.start(elapsed => {
            const frame = new Frame(
                simulation.getBallPosition(),
                options.getFloorPosition()
            );
            
            callback(frame);

            simulation.update(elapsed);
        });
    }
};

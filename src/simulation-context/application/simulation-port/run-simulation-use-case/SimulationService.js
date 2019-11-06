const Frame = require('./Frame');
const Options = require('../../../domain/simulation/Options');

/**
 * @package SimulationContext.Application.SimulationPort.RunSimulationUseCase
 * @requires SimulationContext.Application.ConfigurationPort.Configuration
 * @requires SimulationContext.Application.SimulationPort.RunSimulationUseCase.Frame
 * @requires SimulationContext.Domain.Simulation.SimulationFactory
 * @requires SimulationContext.Domain.Simulation.Simulation
 * @requires SimulationContext.Domain.Simulation.Loop
 */
module.exports = class SimulationService {
    /**
     * @param {Configuration} conf
     * @param {SimulationFactory} factory
     * @param {Loop} loop
     */
    constructor(conf, factory, loop) {
        this._conf = conf;
        this._factory = factory;
        this._loop = loop;
    }

    /**
     * @param {Function} callback 
     */
    run(callback) {
        const options = new Options(
            this._conf.getBallMass(),
            this._conf.getBallElasticity(),
            this._conf.getBallPos(),
            this._conf.getFloorPos(),
            this._conf.getAirViscosity()
        );
        /** @type {Simulation} */
        const simulation = this._factory.create(options);
        
        this._loop.start(elapsed => {
            const frame = new Frame(
                simulation.getBallPosition(),
                this._conf.getFloorPos()
            );
            
            callback(frame);

            simulation.update(elapsed);
        });
    }
};

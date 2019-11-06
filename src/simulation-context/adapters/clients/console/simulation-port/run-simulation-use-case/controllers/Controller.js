const Options = require('../../../../../../domain/simulation/Options');
const RunSimulationRequest = require('../../../../../../application/simulation-port/run-simulation-use-case/RunSimulationRequest');

/**
 * @package SimulationContext.Adapters.Clients.Console.SimulationPort.RunSimulationUseCase.Controllers
 * @requires SimulationContext.Domain.Simulation.Options
 * @requires SimulationContext.Application.SimulationPort.RunSimulationUseCase.RunSimulationRequest
 * @requires SimulationContext.Application.SimulationPort.RunSimulationUseCase.RunSimulationUseCase
 */
module.exports = class Controller {
    /**
     * @param {RunSimulationUseCase} useCase
     */
    constructor(useCase) {
        this._useCase = useCase;
    }

    /**
     * @param {Array} args 
     */
    runSimulation(args) {
        const options = new Options(
            this._parse(args, '--ball-mass='),
            this._parse(args, '--ball-elasticity='),
            this._parse(args, '--ball-pos='),
            this._parse(args, '--floor-pos='),
            this._parse(args, '--air-viscosity=')
        );
        this._useCase.runSimulation(new RunSimulationRequest(options));
    }

    /**
     * @param {Array} args
     * @param {string} name
     * @return {Number|null}
     */
    _parse(args, name) {
        const size = name.length;
        for (const arg of args) {
            if (arg.startsWith(name)) {
                return Number.parseFloat(arg.substring(size));
            }
        }

        return null;
    }
};
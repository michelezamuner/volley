const CliConfiguration = require('../../../drivers/cli-configuration/configuration-port/CliConfiguration');
const PhysicsFactory = require('../../../../domain/physics/PhysicsFactory');
const Physics = require('../../../../domain/physics/Physics');
const Time = require('../../../../domain/physics/Time');
const SystemTime = require('../../../drivers/system-time/time-port/SystemTime');
const SimulationService = require('../../../../application/simulation-port/run-simulation-use-case/SimulationService');
const ConsoleLogView = require('../simulation-port/run-simulation-use-case/views/ConsoleLogView');
const SimulationPresenter = require('../simulation-port/run-simulation-use-case/presenters/TimedPresenter');
const RunSimulationUseCase = require('../../../../application/simulation-port/run-simulation-use-case/RunSimulationUseCase');
const Controller = require('../simulation-port/run-simulation-use-case/controllers/Controller');

module.exports = function main() {
    const simulationTime = new SystemTime();
    const service = new SimulationService(
        new CliConfiguration(process.argv.slice(2)),
        new Physics(new PhysicsFactory()),
        new Time(simulationTime)
    );
    const presenter = new SimulationPresenter(new ConsoleLogView(), simulationTime);
    const useCase = new RunSimulationUseCase(service, presenter);
    const controller = new Controller(useCase);
    
    controller.runSimulation();
}

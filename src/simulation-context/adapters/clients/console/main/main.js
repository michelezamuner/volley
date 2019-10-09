const CliConfiguration = require('../../../drivers/cli-configuration/configuration-port/CliConfiguration');
const PhysicsFactory = require('../../../../domain/physics/PhysicsFactory');
const Time = require('../../../../domain/physics/Time');
const SystemTime = require('../../../drivers/system-time/time-port/SystemTime');
const PresenterTime = require('../simulation-port/run-simulation-use-case/presenters/PresenterTime');
const SimulationService = require('../../../../application/simulation-port/run-simulation-use-case/SimulationService');
const ConsoleLogView = require('../simulation-port/run-simulation-use-case/views/ConsoleLogView');
const SimulationPresenter = require('../simulation-port/run-simulation-use-case/presenters/TimedPresenter');
const RunSimulationUseCase = require('../../../../application/simulation-port/run-simulation-use-case/RunSimulationUseCase');
const Controller = require('../simulation-port/run-simulation-use-case/controllers/Controller');

module.exports = function main() {
    const service = new SimulationService(
        new CliConfiguration(process.argv.slice(2)),
        new PhysicsFactory(),
        new Time(new SystemTime())
    );
    const presenter = new SimulationPresenter(new ConsoleLogView(), new PresenterTime());
    const useCase = new RunSimulationUseCase(service, presenter);
    const controller = new Controller(useCase);
    
    controller.runSimulation();
}

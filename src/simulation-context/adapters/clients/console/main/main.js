const ImmediateConfiguration = require('../../../drivers/immediate-configuration/configuration-port/ImmediateConfiguration');
const BodyFactory = require('../../../../domain/physics/BodyFactory');
const SimpleTime = require('../../../../../../lib/time/SimpleTime');
const Time = require('../../../../domain/physics/Time');
const TimeDriver = require('../../../drivers/time/time-port/Time');
const PresenterTime = require('./Time');
const SimulationService = require('../../../../application/simulation-port/run-simulation-use-case/SimulationService');
const ConsoleLogView = require('../simulation-port/run-simulation-use-case/views/ConsoleLogView');
const SimulationPresenter = require('../simulation-port/run-simulation-use-case/presenters/TimedPresenter');
const RunSimulationUseCase = require('../../../../application/simulation-port/run-simulation-use-case/RunSimulationUseCase');
const Controller = require('../simulation-port/run-simulation-use-case/controllers/Controller');

module.exports = function main() {
    const args = process.argv.slice(2);
    let ballMass = 5;
    let ballPos = 200;
    for (const arg of args) {
        if (arg.startsWith('--ball-mass=')) {
            ballMass = Number.parseFloat(arg.substring(12));
        }
        if (arg.startsWith('--ball-pos=')) {
            ballPos = Number.parseFloat(arg.substring(11));
        }
    }

    const service = new SimulationService(
        new ImmediateConfiguration(ballMass, ballPos),
        new BodyFactory(),
        new Time(new TimeDriver(new SimpleTime()))
    );
    const presenter = new SimulationPresenter(new ConsoleLogView(), new PresenterTime(new SimpleTime()));
    const useCase = new RunSimulationUseCase(service, presenter);
    const controller = new Controller(useCase);
    
    controller.runSimulation();
}

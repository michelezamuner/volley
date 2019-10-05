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
    const factory = new BodyFactory();
    const service = new SimulationService(factory, new Time(new TimeDriver(new SimpleTime())));
    const presenter = new SimulationPresenter(new ConsoleLogView(), new PresenterTime(new SimpleTime()));
    const useCase = new RunSimulationUseCase(service, presenter);
    const controller = new Controller(useCase);
    
    controller.runSimulation();
}

const BodyFactory = require('../../../domain/physics/BodyFactory');
const Time = require('../../../domain/physics/Time');
const TimeProvider = require('../../time-driver/Time');
const SimulationService = require('../../../application/simulation-port/run-simulation-use-case/SimulationService');
const Console = require('./Console');
const ConsoleLogView = require('../simulation-port/run-simulation-use-case/views/ConsoleLogView');
const SimulationPresenter = require('../simulation-port/run-simulation-use-case/presenters/TimedPresenter');
const RunSimulationUseCase = require('../../../application/simulation-port/run-simulation-use-case/RunSimulationUseCase');
const Controller = require('../simulation-port/run-simulation-use-case/controllers/Controller');

const factory = new BodyFactory();
const timeProvider = new TimeProvider();
const time = new Time(timeProvider);
const service = new SimulationService(factory, time);
const view = new ConsoleLogView(new Console());
const presenter = new SimulationPresenter(view, timeProvider);
const useCase = new RunSimulationUseCase(service, presenter);
const controller = new Controller(useCase);

controller.runSimulation();
const UrlSearchParams = require('../simulation-port/run-simulation-use-case/controllers/UrlSearchParams');
const SimulationFactory = require('../../../../domain/simulation/SimulationFactory');
const PhysicsFactory = require('../../../../domain/physics/PhysicsFactory');
const Physics = require('../../../../domain/physics/Physics');
const Time = require('../../../../domain/simulation/Time');
const WebTime = require('../../../drivers/web-time/time-port/WebTime');
const Loop = require('../../../../domain/simulation/Loop');
const WebLoop = require('../../../drivers/web-loop/loop-port/WebLoop');
const SimulationService = require('../../../../application/simulation-port/run-simulation-use-case/SimulationService');
const SceneView = require('../../web/simulation-port/run-simulation-use-case/views/ScreenView');
const ScenePresenter = require('../../web/simulation-port/run-simulation-use-case/presenters/ScenePresenter');
const RunSimulationUseCase = require('../../../../application/simulation-port/run-simulation-use-case/RunSimulationUseCase');
const Controller = require('../../web/simulation-port/run-simulation-use-case/controllers/Controller');

module.exports = function main() {
    const factory = new SimulationFactory(new Physics(new PhysicsFactory()));
    const loop = new Loop(new WebLoop, new Time(new WebTime()));
    const service = new SimulationService(factory, loop);
    const presenter = new ScenePresenter(new SceneView());
    const useCase = new RunSimulationUseCase(service, presenter);
    const controller = new Controller(useCase, new UrlSearchParams());

    controller.runSimulation();
};
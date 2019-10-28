const SceneViewModel = require('./SceneViewModel');

/**
 * @package SimulationContext.Adapters.Clients.Web.SimulationPort.RunSimulationUseCase.Presenters
 * @requires SimulationContext.Application.SimulationPort.RunSimulationUseCase.SimulationPresenter
 * @requires SimulationContext.Adapters.Clients.Web.SimulationPort.RunSimulationUseCase.Presenters.SceneView
 * @requires SimulationContext.Adapters.Clients.Web.SimulationPort.RunSimulationUseCase.Presenters.SceneViewModel
 * @implements SimulationPresenter
 */
module.exports = class ScenePresenter {
    /**
     * @param {SceneView} view 
     */
    constructor(view) {
        this._view = view;
    }

    /**
     * @override
     */
    present(response) {
        const frame = response.getFrame();
        const viewModel = new SceneViewModel(frame.getBallPos(), frame.getFloorPos());
        this._view.render(viewModel);
    }
};
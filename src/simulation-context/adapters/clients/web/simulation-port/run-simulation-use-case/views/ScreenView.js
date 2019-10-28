/**
 * @package SimulationContext.Adapters.Clients.Web.SimulationPort.RunSimulationUseCase.Views
 * @requires SimulationContext.Adapters.Clients.Web.SimulationPort.RunSimulationUseCase.Presenters.SceneView
 * @requires window
 * @implements SceneView
 */
module.exports = class ScreenView {
    /**
     * @constant {Number}
     */
    static get ZERO_POS() { return 100; }

    constructor() {
        this._ball = document.createElement('div');
        this._ball.id = 'ball';
        window.document.body.appendChild(this._ball);
        this._ball.style.display = 'block';
        this._ball.style.position = 'absolute';
        this._ball.style.width = '10px';
        this._ball.style.height = '10px';
        this._ball.style.borderRadius = '5px';
        this._ball.style.backgroundColor = 'black';
        this._ball.style.left = '500px';
    }
    /**
     * @override
     */
    render(viewModel) {
        this._ball.style.top = (ScreenView.ZERO_POS - viewModel.getBallPos()) + 'px';
    }
};
const ScenePresenter = require('../../../../../../../../../src/simulation-context/adapters/clients/web/simulation-port/run-simulation-use-case/presenters/ScenePresenter');
const SceneViewModel = require('../../../../../../../../../src/simulation-context/adapters/clients/web/simulation-port/run-simulation-use-case/presenters/SceneViewModel');

test('renders each frame', () => {
    const ballPos = 10;
    const floorPos = 0;
    const viewModel = new SceneViewModel(ballPos, floorPos);
    const response = {
        getFrame: () => ({
            getBallPos: () => ballPos,
            getFloorPos: () => floorPos,
        }),
    };
    const view = {
        render: jest.fn(),
    };

    const presenter = new ScenePresenter(view);

    presenter.present(response);

    expect(view.render.mock.calls[0][0]).toEqual(viewModel);
});
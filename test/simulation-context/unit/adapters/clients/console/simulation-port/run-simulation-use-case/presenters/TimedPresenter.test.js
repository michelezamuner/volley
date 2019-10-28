const TimedPresenter = require('../../../../../../../../../src/simulation-context/adapters/clients/console/simulation-port/run-simulation-use-case/presenters/TimedPresenter');

test('renders positions once per second', () => {
    const view = {
        render: jest.fn(),
    };
    const times = [1.2325433, 1.3435433, 2.4566758, 3.3676544];
    let calls = 0;
    const time = {
        getProgressiveTime() { return times[calls++]; },
    };
    const position = 1234;
    const frame = {
        getBallPos() { return position; },
    };
    const response = {
        getFrame() { return frame; },
    };

    const presenter = new TimedPresenter(view, time);

    presenter.present(response);
    expect(view.render).toHaveBeenCalledTimes(1);
    expect(view.render.mock.calls[0][0]).toBe(position);

    presenter.present(response);
    expect(view.render).toHaveBeenCalledTimes(1);

    presenter.present(response);
    expect(view.render).toHaveBeenCalledTimes(2);
    expect(view.render.mock.calls[1][0]).toBe(position);

    presenter.present(response);
    expect(view.render).toHaveBeenCalledTimes(3);
    expect(view.render.mock.calls[2][0]).toBe(position);
});
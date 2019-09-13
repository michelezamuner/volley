const TimedPresenter = require('../../../../../../../src/simulation-context/adapters/logging-console-client/simulation-port/run-simulation-use-case/TimedPresenter');

test('renders positions once per second', () => {
    const view = {
        render: jest.fn(),
    };
    const times = [1232.5433, 1343.5433, 2456.6758, 3367.6544];
    let calls = 0;
    const time = {
        now() { return times[calls++]; },
    };

    const presenter = new TimedPresenter(view, time);
    const position = 1234;

    presenter.present(position);
    expect(view.render).not.toBeCalled();

    presenter.present(position);
    expect(view.render).toHaveBeenNthCalledWith(1, position);

    presenter.present(position);
    expect(view.render).toBeCalledTimes(1);
});
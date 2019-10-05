const TimedPresenter = require('../../../../../../../../../src/simulation-context/adapters/clients/console/simulation-port/run-simulation-use-case/presenters/TimedPresenter');

test('renders positions once per second', () => {
    const view = {
        render: jest.fn(),
    };
    const times = [1.2325433, 1.3435433, 2.4566758, 3.3676544];
    let calls = 0;
    const time = {
        now() { return times[calls++]; },
    };

    const presenter = new TimedPresenter(view, time);
    const position = 1234;

    presenter.present(position);
    expect(view.render).toHaveBeenNthCalledWith(1, position);

    presenter.present(position);
    expect(view.render).toHaveBeenNthCalledWith(1, position);

    presenter.present(position);
    expect(view.render).toHaveBeenNthCalledWith(2, position);

    presenter.present(position);
    expect(view.render).toHaveBeenNthCalledWith(3, position);
});
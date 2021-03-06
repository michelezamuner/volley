Feature: Run simulation
    As a Player
    I want to be able to run the simulation
    In order to see the positions of the moving ball

    Scenario: Ball is free falling
        Given there is a ball with initial position of "200"
        And there is gravity
        When the Player runs the simulation
        Then the ball positions at each second are logged
        And the ball positions are described by the model: "x(t) = x0 - g/2 * t^2"

    Scenario: Ball is bouncing on the floor
        Given there is a ball with initial position of "50"
        And there is gravity
        And there is a floor at position "0"
        When the Player runs the simulation
        Then the ball positions at each second are logged
        And the ball positions are described by the model:
            """
            p = 2 * sqrt(2 * x0 / g)
            x(t) = x0 - g/2 * t^2                   if n * p <= t <= (n + 1/2) * p
            x(t) = sqrt(2 * x0 * g) * t - g/2 * t^2 if (n + 1/2) * p < t < (n + 1) * p
            """

    Scenario: Ball is bouncing on the floor with air friction
        Given there is a ball with initial position "20" and mass "5"
        And there is gravity
        And there is a floor at position "0"
        And there is air friction with viscosity of "0.5"
        When the Player runs the simulation
        Then the ball positions at each second are logged
        And the ball positions are described by the model:
            """
            m = ball mass
            h = air viscosity
            k = h/m
            tb = time at bounce
            vb = velocity at bounce
            p = 2 * tb
            x(t) = x0 - g/k^2 * (e^(-k * t) - 1) - g/k * t          if n * p <= t <= (n + 1/2) * p
            x(t) = (-vb * k + g) * (1 - e^(-k * t)) / k^2 - g/k * t  if (n + 1/2) * p < t < (n + 1) * p
            """
    
    Scenario: Ball is bouncing on the floor with air friction and non-perfect bounce
        Given there is a ball with initial position "20" and mass "5"
        And there is gravity
        And there is a floor at position "0"
        And there is air friction with viscosity of "0.5"
        And the ball bounces with coefficient of restitution of "0.75"
        When the Player runs the simulation
        Then the ball positions at each second are logged
        And the ball positions are described by the model:
            """
            m = ball mass
            h = air viscosity
            k = h/m
            tb = time at bounce
            vb = velocity at bounce
            u = coefficient of restitution
            p = 2 * tb
            x(t) = x0 - g/k^2 * (e^(-k * t) - 1) - g/k * t              if n * p <= t <= (n + 1/2) * p
            x(t) = (-u * vb * k + g) * (1 - e^(-k * t)) / k^2 - g/k * t  if (n + 1/2) * p < t < (n + 1) * p
            """
Feature: Run simulation
    As a Player
    I want to be able to run the simulation
    In order to see the positions of the moving ball

    Scenario: Ball is free falling
        Given there is a ball with initial position of 200
        And there is gravity
        When the Player runs the simulation
        Then the following approximated ball positions are logged:
            """
            200
            195.0967
            180.3868
            155.8703
            121.5472
            77.4175
            23.4812
            """

    Scenario: Ball is bouncing on the floor
        Given there is a ball with initial position of 50
        And there is gravity
        And there is a floor at position 0
        When the Player runs the simulation
        Then the following approximated ball positions are logged:
            """
            50
            45.0967
            30.3868
            5.8703
            22.0711
            40.5724
            49.2671
            48.1552
            37.2367
            16.5115
            """
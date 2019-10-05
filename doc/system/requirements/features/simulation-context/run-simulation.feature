Feature: Run program
    As a Player
    I want to be able to run the simulation
    In order to see the positions of the falling ball

Scenario: Logging the positions of the ball
    Given there is a ball with initial position of 200
    And there is gravity
    When the Player runs the application
    Then the following approximated ball positions are printed to the console:
        """
        200
        195.0967
        180.3868
        155.8703
        121.5472
        77.4175
        23.4812
        """

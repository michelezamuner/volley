Feature: Ball falling
    As a Player
    I want to see the ball falling
    In order to simulate the physics of the ball

Scenario: Logging the positions of the falling ball
    Given there is a ball with initial position of 50
    And there is gravity
    When the Player runs the application
    Then the following approximated ball positions are printed to the console:
        """
        100
        95.0967
        80.3868
        55.8703
        21.5472
        """

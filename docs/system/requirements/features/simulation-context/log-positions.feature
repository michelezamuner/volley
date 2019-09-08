Feature: Log positions
    As a Player
    I want to see the different ball positions in time
    In order to check that the ball is falling

Scenario: Logging the ball positions
    Given the initial ball position is 100
    When the Player starts the application
    Then the following approximated ball positions are printed to the console:
        """
        100
        90.19335
        70.58005
        41.1601
        1.9335
        -47.09975
        """

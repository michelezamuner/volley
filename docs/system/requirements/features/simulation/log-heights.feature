Feature: Log heights
    As a Player
    I want to see the different ball heights in time
    In order to know that the ball is falling

Scenario: Logging the ball heights
    Given the initial ball height is 100
    When the Player starts the application
    Then the following approximated ball heights are printed to the console:
        """
        100
        90.19335
        70.58005
        41.1601
        1.9335
        -47.09975
        """

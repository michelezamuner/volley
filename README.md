# Volley


## Milestone 1

- 2D graphical user interface on the Web browser
- there are two players (squares), a net and a ball
- players can set the ball with a fixed force, when the ball is close enough
- players can change the direction of the set force, which will always point towards the net
- the direction can be set at any moment, even if the ball is not nearby yet
- players can jump to a fixed height, but cannot move while floating, unless already moving at the moment of the jump
- one player is controlled by the player, the other by a (very basic) AI
- there's a multiplayer option where the second player is controlled by different keys
- there's a scoring system, games are won at a certain amount of point
- points are assigned either when the ball touches the ground, or when it falls out of the screen bounds


### Iteration 1

#### Requirements
- command line application `volley`
- output is a sequence of lines containing the height of the ball at the current moment
- the ball is falling under gravity
- there is no interaction, to stop the application the process must be stopped
- the ball just falls, there is no floor and no bouncing


#### Design:
- domains: the core domain is the Physics Domain, containing the simulation of time, bodies and gravity
- bounded contexts: for this we only need one bounded context, which would be the Simulation Context, containing both the domain model and the CLI client
- actors: the sole actor is Player, and the sole user story is Run Simulation, where the Player just runs the program
- ports: the sole primary port is the Simulation port, featuring the Run Simulation use case; a secondary port Time could be needed to get time measurements
- adapters: the CLI client will access the Simulation port from the command line, and the System Time driver will provide the system time


### Iteration 2

#### Requirements
- there's a floor at a certain height, making the ball bounce
- air friction is considered for all bodies


### Iteration 3

#### Requirements
- a 2D graphical user interface is supported
- the existing output is turned to a debug log


### Iteration 4

#### Requirements
- one player (square) is added
- the net is added
- the ball bounces against the net
- when a key is pressed, and the ball is close enough to the player, a fixed force is applied to the ball


### Iteration 5

#### Requirements
- with two different keys it's possible to change the direction of the force, making it rotate in two ways
- while the key is pressed, a graphical feedback shows the currently selected direction


### Iteration 6

#### Requirements
- the player can jump


### Iteration 7

#### Requirements
- a second player is added, with a different set of keys, facing the other direction


### Iteration 8

#### Requirements
- the scoring system is added
- victory conditions and messages are added


### Iteration 9

#### Requirements
- AI for the second player is added
- single player vs. multi player choice is added


## Milestone 2

- a desktop version of the game is created


## Milestone 3

- AI is moved to the server
- AI is improved
- scoring is moved to the server
- players actions are sent to the server, and back
- both Web and desktop versions of the game are turned into client-server versions, with shared server
- server must deal with multiple connected clients at the same moment


## Milestone 4

- the latency (ping) of the server is displayed on the clients
- a system is created that simulates multiple players playing at the same time with different clients
- the system is used to test how many concurrent players the server can support


## Milestone 5

- there are now two players per side
- players can dig and spike, in addition to set
- spike is always done when jumping
- dig is always done when receiving a spike
- the same key is used in all three cases to select the direction of the action
- players have a front side, so that spikes and sets are directed towards where the player is facing
- the three touches rule is enforced
- all this is only available in multiplayer mode


## Milestone 6

- AI is updated with the two players and three actions
- there's no explicit distinction between single and multi player mode: the user can select which players are controlled by AI


## Milestone 7

- graphics is turned to 3D
- players can now move and play actions in two directions
- ball moves in three dimensions


## Milestone 8

- additional numbers of players are available per team

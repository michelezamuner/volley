## Spike
To spike the ball, the player must reach it. The possibility of reaching the ball depends on the relative position of the ball and the player's body. In particular, it depends on the possibility for the arm to extend to different points of the surrounding space. This means that at each moment there's a volume of space where the ball can be hit. The window of opportunity to actually spike the ball is the interval of time when the ball moves inside this volume. If the action of spiking is performed outside of this window of opportunities, the spike will fail, and the ball will continue its movement undisturbed. The volume of reachable points depends heavily on the configuration of the body. Areas in front of the body are easily reached, areas on the back can't be reached at all, area to the same side of the arm are easier to reach than areas to the opposite side. Thus, the volume won't probably have a regular shape.

When the ball is hit, the point of application on the ball, the direction and the value of the impulse, depend on the point in space where the hand hit the ball. If the ball is hit in the ideal point in space, which is in front of the body at a right angle, the maximum force and the widest range of directions can be applied. If the ball is locate quite on the right side, it will be impossible to send it to the left, and vice-versa. If the ball is hit very near to the body, it will be impossible to spike it hard nor precisely.

Given a configuration for the system "body plus ball", a range of possible actions is seleted. First we must consider the kind of spike. There are three kinds of spikes: frontal spike, closing spike and opening spike. Assuming to be spiking with the right arm, with a frontal spike the arm is moved towards the front of the body, and down, sending the ball towards the front. With a closing spike, the arm is moved towards the left, and down (closing over the body), sending the ball towards the left. With an opening spike, the arm is moved towards the right, and down, sending the ball towards the right. Considering the realistic physical configuration of the shoulder, frontal spikes are the easiest and most effective, closing spikes are less effective, and opening spikes are the hardest and least effective. Depending on the configuration, it could be impossible or really hard to perform one or more of these kinds of spikes. If the ball is in the ideal relative position, it's easy to to all three. If the ball is on the right side, it will be somewhat easier to make an opening spike, impossible to make a closing one, and very hard to do a frontal one, and vice-versa. This means that, given a configuration, the player can choose amongst a range of possible spike types, for instance using a cursor moving on a slider. The slider has a middle range, indicating the frontal spike, a left and a right range, indicating closing and opening spikes:

  C    F    O
|----*----*----|

If the configuration is such that the ball is a bit on the right side, it will become very difficult to do a closing, more difficult to do a front, and easier to do an opening:

 C  F   O
|-*--*-----|

In general, spiking out of the optimal configuration should be harder, so the slider should be narrower. The idea is that it should be harder to select the closing spike.

If the ball is too much on the left, it's basically only possible to do a closing spike:

   C
|-----**|

So, during the game the player has to choose the kind of spike to perform. It should be really quick since there's no time. For example, he could use the arrow keys to move the cursor over the slider: the final position determines the kind of spike. If the player lets the cursor to the far right, he wants to do a very extreme opening movement; if the cursor is only a bit on the right, it will be a lighter opening; if the cursor is let in the middle, it will be a frontal spike, and so on. The starting position of the cursor should be the easiest spike to perform. In the ideal configuration the easiest spike is the frontal one, so the cursor starts from the middle. With the ball located to the right, it's easiest to do an opening, so the cursor starts to the right, and so on. In this way, the most difficult spikes require more time to be selected, and so it's actually difficult to perform them, given the very short time available while playing.

The second variable the player can control when spiking is the hit point on the ball's surface. Hitting the ball on the top allows to spike it towards the ground, while hitting the ball to its bottom will spike it high towards the ceiling. In a similar fashion, hitting the ball to the left-top will spike it towards the right-bottom, and vice-versa. This effect will add up to the effect of the kind of spike. So the player can choose in some way the point where to hit the ball. Obviously some points won't be accessible, for example all the points on tha back of the ball. The set of available points will depend on the configuration body/ball. If the ball is over the top of the player's head, it won't be possible to hit it on the top, so it'll be very difficult to spike it towards the ground. If the ball is in a really low position, lower than the head of the player for instance, and very near to its body, it won't be possible to spike it much far in the opponents' field. If the ball is located to the right, it won't be possible to hit it on the right side, and vice-versa.

So, depending on the configuration, the player will have an interface representing the hittable surface of the ball. Since the ball is a sphere, this surface will always appear as a circle. Another cursor will allow the player to select the hit point on the available surface.

### Shoulder modeling
The first task is then to model the shoulder link and its movement. The shoulder only allows rotations, not translations. Let's see what happens on the three planes: lateral, frontal and top.

---------                   -----------
|  top                      |      
|   '                       |     |
|   o    <- frontal         |   --x--
|   |\   <- arm s           |     |
|   |    <- legs            |      

On the lateral plane the shoulder allows free rotation, so every angle is permitted.

--------                    ---------
|  top                      |
|   '                       |     |
|   o    <- lateral         |   --x--
|  /|\   <- arms            |     |
|  / \   <- legs            |

We assume that on the frontal plane the shoulder allows free rotation as well (albeit with less efficiency).

-------                     ---------
|frontal                    |
|   '                       |     |
|  -o-  <- lateral          |     x--
|  , ,                      |
|  arms                     |

On the top plane, on the other hand, the arm is somewhat limited, because it obviously can't reach the back of the body. We assume for simplicity that the arm can only move between the lateral and the front position, even if in real life it can move a bit more.
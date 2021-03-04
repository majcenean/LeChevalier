## ART385 Project 1: Le Chevalier
###### by Maj Jenkins
March 4, 2021

### Overview
A project about longing for someone you've only ever spoken to over text. 

This is a web game intended to be engaged at home to help players understand the dangers of befriending and dating online, learning the importance of online safety and privacy. The game brings to light the reality that anyone could be behind the text you find yourself exchanging.

Created in p5.js.

### Technical Details

#### sketch.js (source code)
The code for this project is based upon the state machine found in the development folder. There are 27 different states in total and 6 different endings which can be achieved depending on player interaction. There are 3 "tiers" or "stages" of letters within the game; the player will receive and respond to three letters before the end.

The player interaction is dependent on keyboard and mouse input. The main interactions is for the player to choose between left and right with their mouse, and to work through the broader story and setup by pressing the spacebar.

This code majorly relies upon the arrays (beginning at line 500) to organize and call upon the states.

#### development folder
XD Wireframe and initial state machine drawing.<br>
The XD document may also be accessed online here: https://xd.adobe.com/view/054df5e1-afaa-46bf-bc5b-d8cfacd3b716-501e/?fullscreen&hints=off

#### style_guide folder
A minimal style guide for the project instructing how to use the typefaces and color palette.

#### assets/scene folder
Image assets for the scenes. Includes the backgrounds, letters, and decorative images.

#### assets/instruct folder
Image assets for the control visualization, images of keyboard keys and a computer mouse to illustrate how to navigate the space.

#### assets/fonts
OTF files of the 3 fonts used in this project, which include:

##### Ruritana by Paul Lloyd 
https://www.dafont.com/ruritania.font

##### JSL Blackletter by Jeffrey S. Lee 
https://www.dafont.com/jsl-blackletter.font

##### Pirata One by Rodrigo Fuenzalida 
https://www.dafont.com/pirata-one.font
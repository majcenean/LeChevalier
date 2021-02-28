/*************************************************************************
ART385 Project 1: Le Chevalier
          by Maj Jenkins
          March 4, 2021

    Overview:
    
    
    ---------------------------------------------------------------------
    Notes: 
     (1) 
**************************************************************************/

/*************************************************************************
// Global variables
**************************************************************************/


// Values ///////////////////////////////////////////
// How big should the images/scene be
var imgRatio = 1.3;

// How far apart should the instructions be from one another
var instructionOffset = 50;

// Mouse boundary; how far should the user have to move their mouse, and where should the indication appear
var mouseBoundaryValue = 9;


// String arrays
var colorsRow = ["#E8A838", "#CD6B5E", "6A3154", "#750C11", "#312651"];
var instruct = [];
instruct[0] = "Click to progress through the story";
instruct[1] = "Press [F] for fullscreen";
instruct[2] = "Press [I] to pull up the instruction screen";
instruct[3] = "Press [Esc] or click to continue";


// State machine ///////////////////////////////////////////
// Variable that is a function 
var drawFunction;

// Beginning the state at 0
var stateNumber = 0;
var stateList = [];

var letterNumber;
var letterState = [];

var splashNumber;
var splashState = [];

var actionNumber;
var actionState = [];

var endNumber;
var endState = [];


// Assets ///////////////////////////////////////////
// Fonts
var fontMain;
var fontTitle;
var fontLetter;

// Misc Images
var cursor;

// Instruction Images
var imgKeyI;
var imgKeyF;
var imgKeyEsc;

// Scene Images
var openingBg;
var setupBg;
var letterBg;
var splashBg = [];
var actionBg = [];
var endBg = [];

/*************************************************************************
// Window resize
**************************************************************************/
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

/*************************************************************************
// Function preload
**************************************************************************/
function preload() {
  // Fonts
  fontMain = loadFont('assets/fonts/pirata_one.otf');
  fontTitle = loadFont('assets/fonts/ruritania.otf');
  fontLetter = loadFont('assets/fonts/jsl_blackletter.otf');

  // Misc Images
  cursor = loadImage('assets/cursor.png');

  // Instruction Images
  imgKeyI = loadImage('assets/instruct/i_key.png');
  imgKeyF = loadImage('assets/instruct/f_key.png');
  imgKeyEsc = loadImage('assets/instruct/esc_key.png');

  // Background Images /////////////////////////////////////
  // 1 opening state
  openingBg = loadImage('assets/scene/splash.png');

  // 1 setup state
  setupBg = loadImage('assets/scene/splash.png');

  // 6 letter states that use the same background
  letterBg = loadImage('assets/scene/letter.png');

  // 9 splash states
  splashBg[0] = loadImage('assets/scene/scene.png');
  splashBg[1] = loadImage('assets/scene/scene.png');
  splashBg[2] = loadImage('assets/scene/scene.png');
  splashBg[3] = loadImage('assets/scene/scene.png');
  splashBg[4] = loadImage('assets/scene/scene.png');
  splashBg[5] = loadImage('assets/scene/scene.png');
  splashBg[6] = loadImage('assets/scene/scene.png');
  splashBg[7] = loadImage('assets/scene/scene.png');
  splashBg[8] = loadImage('assets/scene/scene.png');

  // 3 action states
  actionBg[0] = loadImage('assets/scene/scene.png');
  actionBg[1] = loadImage('assets/scene/scene.png');
  actionBg[2] = loadImage('assets/scene/scene.png');

  // 6 end states
  endBg[0] = loadImage('assets/scene/scene.png');
  endBg[1] = loadImage('assets/scene/scene.png');
  endBg[2] = loadImage('assets/scene/scene.png');
  endBg[3] = loadImage('assets/scene/scene.png');
  endBg[4] = loadImage('assets/scene/scene.png');
  endBg[5] = loadImage('assets/scene/scene.png');

// Decoration Images

}

/*************************************************************************
// Function setup
**************************************************************************/
function setup() {
    createCanvas(windowWidth, windowHeight);
    rectMode(CENTER);
    textAlign(CENTER);
    textFont(fontMain);

    // Set to splash screen for startup
    drawFunction = stateOpening;
    // drawfunction = stateList[stateNumber];
}

/*************************************************************************
// Function draw
**************************************************************************/
function draw() {
  background('#B7CCD5');
  fill('#fff');
  noStroke();
  textSize(30);
  textFont(fontMain);
  textAlign(CENTER);
  ellipseMode(CENTER);
  rectMode(CENTER);
  imageMode(CENTER);

  // Call the state machine function (a variable)
  drawFunction();

  // Draw the instructions message at the right top of screen
  drawInstructMessage();

  // 'Click to continue' message on splash screens
  drawClickInstruction();

  // Draw the controls
  drawMouseBoundary();

  // custom cursor (must stay at bottom of function order)
  noCursor();
  image(cursor, mouseX, mouseY, 40, 40);
}

/*************************************************************************
// States
**************************************************************************/

// Setup States //////////////////////////////////////////////////

stateOpening = function() {
  background(colorsRow[1]);
  image(openingBg, width/2, height/2, 1920/imgRatio, 1080/imgRatio);

  // Title
  push();
    textFont(fontTitle);
    textAlign(LEFT);
    textSize(width/20);
    text("Le Chevalier", width/3, height/3);
  pop();

  push();
    textAlign(LEFT);
    imageMode(CORNER);
    // click to enter text
    text("click to begin", width/3, 3*(height/4));
  pop();

  stateNumber = 0;
}

// Background story
stateSetup = function() {
  background(colorsRow[1]);
  image(setupBg, width/2, height/2, 1920/imgRatio, 1080/imgRatio);

  stateNumber = 1;

  text('Setup', width/2, height-(height/10));
}

// Instructions for how to control the letter writing
stateInstructions = function() {
  background(colorsRow[1]);
  for (i=0; i < 4; i++) {
    push();
    textSize(35);
    textAlign(LEFT);
    text(instruct[i], width/4, height/4+(i*instructionOffset));
    pop();
  }
  stateNumber = 2;
}



// Letter States //////////////////////////////////////////////////

stateLetter1 = function () {
  background(colorsRow[4]);
  image(letterBg, width/2, height/2, 1920/imgRatio, 1080/imgRatio);
  letterNumber = 0;
  stateNumber = 3;
    text('Letter1', width/2, height-(height/10));
}

stateLetter2a = function () {
  background(colorsRow[4]);
  image(letterBg, width/2, height/2, 1920/imgRatio, 1080/imgRatio);
  letterNumber = 1;
  stateNumber = 4;
    text('Letter2a', width/2, height-(height/10));
}

stateLetter2b = function () {
  background(colorsRow[4]);
  image(letterBg, width/2, height/2, 1920/imgRatio, 1080/imgRatio);
  letterNumber = 2;
  stateNumber = 5;
    text('Letter2b', width/2, height-(height/10));
}

stateLetter3a = function () {
  background(colorsRow[4]);
  image(letterBg, width/2, height/2, 1920/imgRatio, 1080/imgRatio);
  letterNumber = 3;
  stateNumber = 6;
    text('Letter3a', width/2, height-(height/10));
}

stateLetter3b = function () {
  background(colorsRow[4]);
  image(letterBg, width/2, height/2, 1920/imgRatio, 1080/imgRatio);
  letterNumber = 4;
  stateNumber = 7;
    text('Letter3b', width/2, height-(height/10));
}

stateLetter3c = function () {
  background(colorsRow[4]);
  image(letterBg, width/2, height/2, 1920/imgRatio, 1080/imgRatio);
  letterNumber = 5;
  stateNumber = 8;
    text('Letter3c', width/2, height-(height/10));
}

// Splash States //////////////////////////////////////////////////

stateSplash1 = function () {
  background(colorsRow[0]);
  image(splashBg[0], width/2, height/2, 1920/imgRatio, 1080/imgRatio);
  splashNumber = 0;
  stateNumber = 9;
    text('Splash1', width/2, height-(height/10));
}

stateSplash2a = function () {
  background(colorsRow[0]);
  image(splashBg[1], width/2, height/2, 1920/imgRatio, 1080/imgRatio);
  splashNumber = 1;
  stateNumber = 10;
    text('Splash2a', width/2, height-(height/10));
}

stateSplash2b = function () {
  background(colorsRow[0]);
  image(splashBg[2], width/2, height/2, 1920/imgRatio, 1080/imgRatio);
  splashNumber = 2;
  stateNumber = 11;
    text('Splash2b', width/2, height-(height/10));
}

stateSplash3a = function () {
  background(colorsRow[0]);
  image(splashBg[3], width/2, height/2, 1920/imgRatio, 1080/imgRatio);
  splashNumber = 3;
  stateNumber = 12;
    text('Splash3a', width/2, height-(height/10));
}

stateSplash3b = function () {
  background(colorsRow[0]);
  image(splashBg[4], width/2, height/2, 1920/imgRatio, 1080/imgRatio);
  splashNumber = 4;
  stateNumber = 13;
    text('Splash3b', width/2, height-(height/10));
}

stateSplash3c = function () {
  background(colorsRow[0]);
  image(splashBg[5], width/2, height/2, 1920/imgRatio, 1080/imgRatio);
  splashNumber = 5;
  stateNumber = 14;
    text('Splash3c', width/2, height-(height/10));
}

stateSplashPath1 = function () {
  background(colorsRow[0]);
  image(splashBg[6], width/2, height/2, 1920/imgRatio, 1080/imgRatio);
  splashNumber = 6;
  stateNumber = 15;
    text('SplashPath1', width/2, height-(height/10));
}

stateSplashPath2 = function () {
  background(colorsRow[0]);
  image(splashBg[7], width/2, height/2, 1920/imgRatio, 1080/imgRatio);
  splashNumber = 7;
  stateNumber = 16;
    text('SplashPath2', width/2, height-(height/10));
}

stateSplashPath3 = function () {
  background(colorsRow[0]);
  image(splashBg[8], width/2, height/2, 1920/imgRatio, 1080/imgRatio);
  splashNumber = 8;
  stateNumber = 17;
    text('SplashPath3', width/2, height-(height/10));
}

// Action States //////////////////////////////////////////////////

statePath3_tier1 = function () {
  background(colorsRow[0]);
  image(actionBg[0], width/2, height/2, 1920/imgRatio, 1080/imgRatio);
  actionNumber = 0;
  stateNumber = 18;
    text('SplashPath3 Discovery', width/2, height-(height/10));
}

statePath3_tier2_fight = function () {
  background(colorsRow[0]);
  image(actionBg[1], width/2, height/2, 1920/imgRatio, 1080/imgRatio);
  actionNumber = 1;
  stateNumber = 19;
    text('SplashPath3 Fight', width/2, height-(height/10));
}

statePath3_tier2_accept = function () {
  background(colorsRow[0]);
  image(actionBg[2], width/2, height/2, 1920/imgRatio, 1080/imgRatio);
  actionNumber = 2;
  stateNumber = 20;
    text('SplashPath3 Accept', width/2, height-(height/10));
}

// Ending States //////////////////////////////////////////////////

stateEnd_path1 = function () {
  background(colorsRow[0]);
  image(endBg[0], width/2, height/2, 1920/imgRatio, 1080/imgRatio);
  endNumber = 0;
  stateNumber = 21;
    text('End 1', width/2, height-(height/10));
}

stateEnd_path2 = function () {
  background(colorsRow[0]);
  image(endBg[1], width/2, height/2, 1920/imgRatio, 1080/imgRatio);
  endNumber = 1;
  stateNumber = 22;
      text('End 2', width/2, height-(height/10));
}

stateEnd_path3_slain = function () {
  background(colorsRow[0]);
  image(endBg[2], width/2, height/2, 1920/imgRatio, 1080/imgRatio);
  endNumber = 2;
  stateNumber = 23;
      text('End 3', width/2, height-(height/10));
}

stateEnd_path3_slay = function () {
  background(colorsRow[0]);
  image(endBg[3], width/2, height/2, 1920/imgRatio, 1080/imgRatio);
  endNumber = 3;
  stateNumber = 24;
      text('End 4', width/2, height-(height/10));
}

stateEnd_path3_part = function () {
  background(colorsRow[0]);
  image(endBg[4], width/2, height/2, 1920/imgRatio, 1080/imgRatio);
  endNumber = 4;
  stateNumber = 25;
      text('End 5', width/2, height-(height/10));
}

stateEnd_path3_marry = function () {
  background(colorsRow[0]);
  image(endBg[5], width/2, height/2, 1920/imgRatio, 1080/imgRatio);
  endNumber = 5;
  stateNumber = 26;
      text('End 6', width/2, height-(height/10));
}



// Arrays of functions 
// (cannot be called before preload because these functions have not yet been created)

// All states
  stateList[0] = stateOpening;
  stateList[1] = stateSetup;
  stateList[2] = stateInstructions;
  stateList[3] = stateLetter1;
  stateList[4] = stateLetter2a;
  stateList[5] = stateLetter2b;
  stateList[6] = stateLetter3a;
  stateList[7] = stateLetter3b;
  stateList[8] = stateLetter3c;
  stateList[9] = stateSplash1;
  stateList[10] = stateSplash2a;
  stateList[11] = stateSplash2b;
  stateList[12] = stateSplash3a;
  stateList[13] = stateSplash3b;
  stateList[14] = stateSplash3c;
  stateList[15] = stateSplashPath1;
  stateList[16] = stateSplashPath2;
  stateList[17] = stateSplashPath3;
  stateList[18] = statePath3_tier1;
  stateList[19] = statePath3_tier2_fight;
  stateList[20] = statePath3_tier2_accept;
  stateList[21] = stateEnd_path1;
  stateList[22] = stateEnd_path2;
  stateList[23] = stateEnd_path3_slain;
  stateList[24] = stateEnd_path3_slay;
  stateList[25] = stateEnd_path3_part;
  stateList[26] = stateEnd_path3_marry;

// Letter states
  letterState[0] = stateLetter1;
  letterState[1] = stateLetter2a;
  letterState[2] = stateLetter2b;
  letterState[3] = stateLetter3a;
  letterState[4] = stateLetter3b;
  letterState[5] = stateLetter3c;

// Splash states
  splashState[0] = stateSplash1;
  splashState[1] = stateSplash2a;
  splashState[2] = stateSplash2b;
  splashState[3] = stateSplash3a;
  splashState[4] = stateSplash3b;
  splashState[5] = stateSplash3c;
  splashState[6] = stateSplashPath1;
  splashState[7] = stateSplashPath2;
  splashState[8] = stateSplashPath3;

// Action states
  actionState[0] = statePath3_tier1;
  actionState[1] = statePath3_tier2_fight;
  actionState[2] = statePath3_tier2_accept;

// End states
  endState[0] = stateEnd_path1;
  endState[1] = stateEnd_path2;
  endState[2] = stateEnd_path3_slain;
  endState[3] = stateEnd_path3_slay;
  endState[4] = stateEnd_path3_part;
  endState[5] = stateEnd_path3_marry;

/*************************************************************************
// Custom functions
**************************************************************************/

function drawInstructMessage() {
  for (i=0; i < 5; i++) {
    if (drawFunction === letterState[i]) {
      image(imgKeyI, width-60, 50, 150, 150);
      push();
      textSize(28);
      textAlign(RIGHT);
      text(instruct[2], width-100, 50);
      pop();
    }
  }
}

function drawClickInstruction() {
  for (i=0; i < 8; i++) {
    if (drawFunction === splashState[i]) {
      text('click to continue', width/2, height-(height/20));
    }
  }
}

// Depending on the user's mouse position, will draw an indicator with the appropriate preview of what that choice is
// For example, the user moves the mouse to the left side of the screen and is told by this function that clicking on the left is a choice to reject
function drawMouseBoundary() {
 if (drawFunction != stateOpening && drawFunction != stateInstructions) {
    if (mouseX < width/mouseBoundaryValue) {
      fill(colorsRow[3]);
      ellipse(width/mouseBoundaryValue, height/2, 100);
    } 
    else if (mouseX > (mouseBoundaryValue-1)*(width/mouseBoundaryValue)) {
      fill(colorsRow[3]);
      ellipse((mouseBoundaryValue-1)*(width/mouseBoundaryValue), height/2, 100);
    }
  }
}


/*************************************************************************
// Control / interaction functions
**************************************************************************/
// Navigate the states
function keyPressed() {
  // I for instructions state
  if (key === 'i') {
      drawFunction = stateInstructions;
  }

  // Escape key to exit instructions state
  if (key === 'Escape') {
    if (drawFunction === stateInstructions) {
      drawFunction = stateList[stateNumber];
    }
  }

  // Fullscreen toggle
  if (key === 'f') {
      let fs = fullscreen();
      fullscreen(!fs);
  }
}

function mousePressed() {
  // Mouse clicks that move the state along linearly; for the introduction and the splash states

  // Introduction
  if (drawFunction === stateOpening) {
      drawFunction = stateSetup;
  }
  else if (drawFunction === stateSetup) {
      drawFunction = splashState[0];
  }
  else if (drawFunction === splashState[0]) {
      drawFunction = stateInstructions;
  }
  else if (drawFunction === stateInstructions) {
      drawFunction = letterState[0];
  }
  // Splashes to letters
  else if (drawFunction === splashState[1]) {
      drawFunction = letterState[1];
  }
  else if (drawFunction === splashState[2]) {
      drawFunction = letterState[2];
  }
  else if (drawFunction === splashState[3]) {
      drawFunction = letterState[3];
  }
  else if (drawFunction === splashState[4]) {
      drawFunction = letterState[4];
  }
  else if (drawFunction === splashState[5]) {
      drawFunction = letterState[5];
  }
  // Splashes to endings
  // Path 1
  else if (drawFunction === splashState[6]) {
      drawFunction = endState[0];
  }
  // Path 2
  else if (drawFunction === splashState[7]) {
      drawFunction = endState[1];
  }
  // Path 3 (start of path 3)
  else if (drawFunction === splashState[8]) {
      drawFunction = actionState[0];
  }



  // Mouse clicks that move the state along nonlinearly; for the letters and choices made by the player

  if (drawFunction != stateOpening && drawFunction != stateInstructions) {
    // LEFT BOUNDARY (REJECT)
      if (mouseX < width/mouseBoundaryValue) {
        // First letter to S2a
         if (drawFunction === letterState[0]) {
            drawFunction = splashState[1];
         }
         // Second letter A to S3a
         else if (drawFunction === letterState[1]) {
            drawFunction = splashState[3];
         }
         // Second Letter B to S3b
         else if (drawFunction === letterState[2]) {
            drawFunction = splashState[4];
         }  
        // Third letter A to Spath1
         else if (drawFunction === letterState[3]) {
            drawFunction = splashState[6];
         }
         // Third letter B to Spath2
         else if (drawFunction === letterState[4]) {
            drawFunction = splashState[7];
         }
         // Third letter C to Spath2
         else if (drawFunction === letterState[5]) {
            drawFunction = splashState[7];
         }
         // Action state 0 to Action state 1 (discovery to fight)
         else if (drawFunction === actionState[0]) {
            drawFunction = actionState[1];
         }
         // Action state 1 to End state 2 (fight to slain)
         else if (drawFunction === actionState[1]) {
            drawFunction = endState[2];
         }
         // Action state 2 to End state 4 (accept to part)
         else if (drawFunction === actionState[2]) {
            drawFunction = endState[4];
         }
      } 


    // RIGHT BOUNDARY (ACCEPT)
    else if (mouseX > (mouseBoundaryValue-1)*(width/mouseBoundaryValue)) {
        // First letter to S2b
         if (drawFunction === letterState[0]) {
            drawFunction = splashState[1];
         }
         // Second letter A to S3b
         else if (drawFunction === letterState[1]) {
            drawFunction = splashState[4];
         }
         // Second Letter B to S3c
         else if (drawFunction === letterState[2]) {
            drawFunction = splashState[5];
         }  
        // Third letter A to Spath2
         else if (drawFunction === letterState[3]) {
            drawFunction = splashState[7];
         }
         // Third letter B to Spath3
         else if (drawFunction === letterState[4]) {
            drawFunction = splashState[8];
         }
         // Third letter C to Spath3
         else if (drawFunction === letterState[5]) {
            drawFunction = splashState[8];
         }
         // Action state 0 to Action state 2 (discovery to fight)
         else if (drawFunction === actionState[0]) {
            drawFunction = actionState[2];
         }
         // Action state 1 to End state 3 (fight to slay)
         else if (drawFunction === actionState[1]) {
            drawFunction = endState[3];
         }
         // Action state 2 to End state 5 (accept to marry)
         else if (drawFunction === actionState[2]) {
            drawFunction = endState[2];
         }


    }
  }
}
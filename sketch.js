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
var imgRatio = 1.5;

// How far apart should the instructions be from one another
var instructionOffset = 50;

// Mouse boundary; how far should the user have to move their mouse, and where should the indication appear
var mouseBoundaryValue = 6.5;


// String arrays
var colorsRow = ["#E8A838", "#CD6B5E", "6A3154", "#750C11", "#312651"];
var instruct = [];
instruct[0] = "Click to progress through the story";
instruct[1] = "Press [F] for fullscreen";
instruct[2] = "Press [I] to pull up the instruction screen";
instruct[3] = "Press [Esc] or [Spacebar] to continue";


// State machine ///////////////////////////////////////////
// Variable that is a function 
var drawFunction;

// Beginning the state at 0
var stateNumber = 0;
var stateList = [];

var letterNumber = 0;
var letterState = [];

var splashNumber = 0;
var splashState = [];

var actionNumber = 0;
var actionState = [];

var endNumber = 0;
var endState = [];


// Assets ///////////////////////////////////////////
// Fonts
var fontMain;
var fontTitle;
var fontLetter;

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

// Decoration Images
var swordCursor;
var frame;
var quill_left;
var quill_right;
var sword_left;
var sword_right;

// Letters
var letter;
var letter_left;
var letter_right;

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
  swordCursor = loadImage('assets/cursor.png');

  // Instruction Images
  imgKeyI = loadImage('assets/instruct/i_key.png');
  imgKeyF = loadImage('assets/instruct/f_key.png');
  imgKeyEsc = loadImage('assets/instruct/esc_key.png');

  // Background Images /////////////////////////////////////
  // 1 opening state
  openingBg = loadImage('assets/scene/main_splash.png');

  // 1 setup state
  setupBg = loadImage('assets/scene/setup.png');
  instructBg = loadImage('assets/scene/splash.png');

  // 6 letter states that use the same background
  letterBg = loadImage('assets/scene/letter_bg.png');

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
  frame = loadImage('assets/scene/frame.png');
  quill_left = loadImage('assets/scene/quill_left.png');
  quill_right = loadImage('assets/scene/quill_right.png');
  sword_left = loadImage('assets/scene/sword_left.png');
  sword_right = loadImage('assets/scene/sword_right.png');

// Letter Images
  letter = loadImage('assets/scene/letters/letter_neutral.png');
  letter_left = loadImage('assets/scene/letters/letter_reject.png');
  letter_right = loadImage('assets/scene/letters/letter_accept.png');
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

  // Draw the controls
  drawMouseBoundary();

  // Draw the letter;
  drawLetter();

  // Reset the game if ended
  resetGame();

  // Frame which makes it look nice
  image(frame, width/2, height/2, 2125/imgRatio, 1285/imgRatio);

  // custom swordCursor (must stay at bottom of function order)
  noCursor();
  image(swordCursor, mouseX, mouseY, 40, 40);
}


/*************************************************************************
// States
**************************************************************************/

// Setup States //////////////////////////////////////////////////

stateOpening = function() {
  drawImage(1, openingBg);

  // Title
  push();
    textFont(fontTitle);
    textAlign(LEFT);
    textSize(width/15);
    text("Le chevalier", 1.5*(width/3), 2*(height/3));
  pop();

  push();
    textAlign(LEFT);
    imageMode(CORNER);
    text("press spacebar to begin", 1.8*(width/3), 3*(height/4));
  pop();

  stateNumber = 0;
}

// Background story
stateSetup = function() {
  drawImage(1, setupBg);
  stateNumber = 1;
  textAlign(LEFT);
  text("You are a knight,", width/6, height/3);
}

// Instructions for how to control the letter writing
stateInstructions = function() {
  drawImage(4, instructBg);

  textSize(width/20);
  text("Instructions", width/2, height/4);

  for (i=0; i < 4; i++) {
    push();
    textSize(35);
    textAlign(LEFT);
    text(instruct[i], width/4, height/3+(i*instructionOffset));
    pop();
  }

  stateNumber = 2;
}


// Letter States //////////////////////////////////////////////////

stateLetter1 = function () {
  drawImage(4, letterBg);
  drawDecisionText('reject', 'accept');
  letterNumber = 0;
  stateNumber = 3;
    // text('Letter1', width/2, height-(height/10));
}

stateLetter2a = function () {
  drawImage(4, letterBg);
  drawDecisionText('reject', 'accept');
  letterNumber = 1;
  stateNumber = 4;
    // text('Letter2a', width/2, height-(height/10));
}

stateLetter2b = function () {
  drawImage(4, letterBg);
  drawDecisionText('reject', 'accept');
  letterNumber = 2;
  stateNumber = 5;
    // text('Letter2b', width/2, height-(height/10));
}

stateLetter3a = function () {
  drawImage(4, letterBg);
  drawDecisionText('reject', 'accept');
  letterNumber = 3;
  stateNumber = 6;
    // text('Letter3a', width/2, height-(height/10));
}

stateLetter3b = function () {
  drawImage(4, letterBg);
  drawDecisionText('reject', 'accept');
  letterNumber = 4;
  stateNumber = 7;
    // text('Letter3b', width/2, height-(height/10));
}

stateLetter3c = function () {
  drawImage(4, letterBg);
  drawDecisionText('reject', 'accept');
  letterNumber = 5;
  stateNumber = 8;
    // text('Letter3c', width/2, height-(height/10));
}

// Splash States //////////////////////////////////////////////////

stateSplash1 = function () {
  drawImage(1, splashBg[0]);
  splashNumber = 0;
  stateNumber = 9;
  // drawSplashText('Splash1');
}

stateSplash2a = function () {
  drawImage(1, splashBg[1]);
  splashNumber = 1;
  stateNumber = 10;
  // drawSplashText('Splash2a');
}

stateSplash2b = function () {
  drawImage(1, splashBg[2]);
  splashNumber = 2;
  stateNumber = 11;
  // drawSplashText('Splash2b');
}

stateSplash3a = function () {
  drawImage(1, splashBg[3]);
  splashNumber = 3;
  stateNumber = 12;
  // drawSplashText('Splash3a');
}

stateSplash3b = function () {
  drawImage(1, splashBg[4]);
  splashNumber = 4;
  stateNumber = 13;
  // drawSplashText('Splash3b');
}

stateSplash3c = function () {
  drawImage(1, splashBg[5]);
  splashNumber = 5;
  stateNumber = 14;
  // drawSplashText('Splash3c');
}

stateSplashPath1 = function () {
  drawImage(1, splashBg[6]);
  splashNumber = 6;
  stateNumber = 15;
  // drawSplashText('SplashPath1');
}

stateSplashPath2 = function () {
  drawImage(1, splashBg[7]);
  splashNumber = 7;
  stateNumber = 16;
  // drawSplashText('SplashPath2');
}

stateSplashPath3 = function () {
  drawImage(1, splashBg[8]);
  splashNumber = 8;
  stateNumber = 17;
  // drawSplashText('SplashPath3');
}

// Action States //////////////////////////////////////////////////

statePath3_tier1 = function () {
  drawImage(0, actionBg[0]);
  drawDecisionText('fight', 'accept');
  actionNumber = 0;
  stateNumber = 18;
    // text('SplashPath3 Discovery', width/2, height-(height/10));
}

statePath3_tier2_fight = function () {
  drawImage(0, actionBg[1]);
  drawDecisionText('be slain', 'slay');
  actionNumber = 1;
  stateNumber = 19;
    // text('SplashPath3 Fight', width/2, height-(height/10));
}

statePath3_tier2_accept = function () {
  drawImage(0, actionBg[2]);
  drawDecisionText('part ways', 'ask for\nhand in marriage');
  actionNumber = 2;
  stateNumber = 20;
    // text('SplashPath3 Accept', width/2, height-(height/10));
}

// Ending States //////////////////////////////////////////////////

stateEnd_path1 = function () {
  drawImage(0, endBg[0]);
  endNumber = 0;
  stateNumber = 21;
    // text('End 1', width/2, height-(height/10));
}

stateEnd_path2 = function () {
  drawImage(0, endBg[1]);
  endNumber = 1;
  stateNumber = 22;
      // text('End 2', width/2, height-(height/10));
}

stateEnd_path3_slain = function () {
  drawImage(0, endBg[2]);
  endNumber = 2;
  stateNumber = 23;
      // text('End 3', width/2, height-(height/10));
}

stateEnd_path3_slay = function () {
  drawImage(0, endBg[3]);
  endNumber = 3;
  stateNumber = 24;
      // text('End 4', width/2, height-(height/10));
}

stateEnd_path3_part = function () {
  drawImage(0, endBg[4]);
  endNumber = 4;
  stateNumber = 25;
      // text('End 5', width/2, height-(height/10));
}

stateEnd_path3_marry = function () {
  drawImage(0, endBg[5]);
  endNumber = 5;
  stateNumber = 26;
      // text('End 6', width/2, height-(height/10));
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

function drawImage(color, img) {
  background(colorsRow[color]);
  image(img, width/2, height/2, 1920/imgRatio, 1080/imgRatio);
}

function drawSplashText(txt) {
  text(txt, width/2, height-(height/8));
  text('press spacebar to continue', width/2, height-(height/10));
}

function drawDecisionText(txtL, txtR) {
  text(txtL, width/mouseBoundaryValue, height/2);
  text(txtR, (mouseBoundaryValue-1)*(width/mouseBoundaryValue), height/2);
}

function drawLetter() {
  for (i=0; i <= 5; i++) {
    if (drawFunction === letterState[i]) {
      if (mouseX > width/mouseBoundaryValue && mouseX < (mouseBoundaryValue-1)*(width/mouseBoundaryValue)) {
        image(letter, width/2, height/2, 1920/imgRatio, 1080/imgRatio);
      } 
      else if (mouseX < width/mouseBoundaryValue) {
        image(letter_left, width/2, height/2, 1920/imgRatio, 1080/imgRatio);
      }       
      else if (mouseX > (mouseBoundaryValue-1)*(width/mouseBoundaryValue)) {
        image(letter_right, width/2, height/2, 1920/imgRatio, 1080/imgRatio);
      }
    }
  }
}


function drawInstructMessage() {
  for (i=0; i <= 5; i++) {
    if (drawFunction === letterState[i]) {
      image(imgKeyI, width-150, 30, 100, 100);
      push();
      textSize(24);
      textAlign(RIGHT);
      text(instruct[2], width-180, 35);
      pop();
    }
  }

  for (i=0; i <= 8; i++) {
    if (drawFunction === splashState[i]) {
      push();
      textSize(width/30);
      text("your life feels a little fuller", width/2, height/3);
      pop();
      push();
      textSize(width/45);
      text("press spacebar to continue", width/2, 6.5*(height/8));
      pop();
    }
  }
}

// Resets game by reloading page
function resetGame() {
  for (i=0; i < 5; i++) {
    if (drawFunction === endState[i]) {
      window.location.href = "/"
    }
  }
}

// Depending on the user's mouse position, will draw an indicator with the appropriate preview of what that choice is
// For example, the user moves the mouse to the left side of the screen and is told by this function that clicking on the left is a choice to reject
function drawMouseBoundary() {
// Mouse boundary for letters
  for (i=0; i <= 5; i++) {
    if (drawFunction === letterState[i]) {
      if (mouseX < width/mouseBoundaryValue) {
      image(quill_left, width/mouseBoundaryValue, height/2+50, 150, 150);
      } 
      else if (mouseX > (mouseBoundaryValue-1)*(width/mouseBoundaryValue)) {
      image(quill_right, (mouseBoundaryValue-1)*(width/mouseBoundaryValue), height/2+50, 150, 150);
      }
    }
  }
// Mouse boundary for actions
  for (i=0; i <= 2; i++) {
    if (drawFunction === actionState[i]) {
      if (mouseX < width/mouseBoundaryValue) {
      image(sword_left, width/mouseBoundaryValue, height/2+50, 150, 150);
      } 
      else if (mouseX > (mouseBoundaryValue-1)*(width/mouseBoundaryValue)) {
      image(sword_right, (mouseBoundaryValue-1)*(width/mouseBoundaryValue), height/2+50, 150, 150);
      }
    }
  }
}

/*************************************************************************
// Control / interaction functions
**************************************************************************/
// Navigate the states
function keyPressed() {
  // I for instructions state when on a letter state
  for (i=0; i < 5; i++) {
    if (drawFunction === letterState[i]) {
      if (key === 'i') {
          drawFunction = stateInstructions;
      }
    }
  }

  // Escape key to exit instructions state
  if (key === 'Escape') {
    if (drawFunction === stateInstructions) {
      drawFunction = letterState[letterNumber];;
    }
  }

  // Fullscreen toggle
  if (key === 'f') {
      let fs = fullscreen();
      fullscreen(!fs);
  }

  // Spacebar presses that moves the state along linearly; for the introduction and the splash states
  if (keyCode === 32) {
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
        drawFunction = letterState[letterNumber];
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
  }
}


// Mouse clicks that move the state along nonlinearly; for the letters and choices made by the player
function mousePressed() {
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
            drawFunction = endState[5];
         }


    }
  }
}
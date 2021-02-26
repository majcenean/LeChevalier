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
// State machine ///////////////////////////////////////////
// Variable that is a function 
var drawFunction;

// Beginning the state at 0
var stateNumber = 0;
var stateFunctions = [];

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
var imgBg = [];
var imgChar = [];
var splash_img;
var cursor;
var imgRatio = 1.7;

// String arrays
var colorsRow1 = ["#FADEA8", "#EBB07A", "#E8CFBF", "#D1CFB2"];
var colorsRow2 = ["#E3B585", "#D98A70", "#B59E8F", "#6E4538"];
var colorsRow3 = ["#918F6B", "#A1D1C2", "#9CB5C9", "#4F99B8"];
var colorsRow4 = ["#BFCCB0", "#7D7A66", "#C9CCCF", "#969496"];
var instruct = ["Press [F] for fullscreen",  "Press [I] to pull up the instruction screen", "PRESS [ESC] OR CLICK ANYWHERE TO CONTINUE"]

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

  // Splash Images
    // splash_img = loadImage('assets/scene/splash.png');
    // imgBg[0] = loadImage('assets/scene/splash_1.png');


  // Decoration Images

}

/*************************************************************************
// Function setup
**************************************************************************/
function setup() {
    createCanvas(windowWidth, windowHeight);
    rectMode(CENTER);
    textAlign(CENTER);
    textFont(fontBulletin);

    // Set to splash screen for startup
    drawFunction = drawSplash;
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
    // noCursor();

    // Call the state machine function (a variable)
    drawFunction();

    // Draw the instructions message
    drawInstructMessage();
}

/*************************************************************************
// States
**************************************************************************/

drawSplash = function() {
  background(colorsRow1[0]);
  image(splash_img, width/2, height/2, 1920/imgRatio, 1080/imgRatio);

  // Title
  push();
    textFont(fontMtHills);
    textSize(width/20);
    text("Le Chevalier", width/3, height/3);
  pop();

  push();
    textAlign(LEFT);
    imageMode(CORNER);
    // click to enter text
    text("CLICK TO START", width/3 - 50, 1.6*(height/4));

 pop();

  // custom cursor (must stay at bottom of function order)
  noCursor();
  image(cursor, mouseX, mouseY, 40, 40);
}

drawInstructions = function() {
  background(colorsRow1[1]);
  // starting i at 0, as long as i is less than 9, add one to i
  // draw text calling from the instruct array, using the variable i to determine number in the array

  for (i=0; i < 5; i++) {
    push();
    textSize(35);
    textAlign(LEFT);
    text(instruct[i], width/4, height/4+(i*gTextOffset));
    pop();
   }
}

drawState1 = function () {
  background(colorsRow1[0]);
  image(imgBg[0], width/2, height/2, 1920/imgRatio, 1080/imgRatio);
  drawControls();

  stateNumber = 0;
}

drawState2 = function () {
  background(colorsRow1[0]);
  image(imgBg[1], width/2, height/2, 1920/imgRatio, 1080/imgRatio);
  drawControls();

  stateNumber = 1;
}

drawState3 = function () {
  background(colorsRow1[0]);
  image(imgBg[2], width/2, height/2, 1920/imgRatio, 1080/imgRatio);
  drawControls();

  stateNumber = 2;
}

drawState4 = function () {
  background(colorsRow1[0]);
  image(imgBg[3], width/2, height/2, 1920/imgRatio, 1080/imgRatio);
  drawControls();

  stateNumber = 3;
}

drawState5 = function () {
  background(colorsRow1[0]);
  image(imgBg[4], width/2, height/2, 1920/imgRatio, 1080/imgRatio);
  drawControls();

  stateNumber = 4;
}

drawState6 = function () {
  background(colorsRow1[0]);
  image(imgBg[5], width/2, height/2, 1920/imgRatio, 1080/imgRatio);
  drawControls();

  stateNumber = 5;
}

drawState7 = function () {
  background(colorsRow1[0]);
  image(imgBg[6], width/2, height/2, 1920/imgRatio, 1080/imgRatio);
  drawControls();

  stateNumber = 6;
}

drawState8 = function () {
  background(colorsRow1[0]);
  image(imgBg[7], width/2, height/2, 1920/imgRatio, 1080/imgRatio);
  drawControls();

  stateNumber = 7;
}

drawState9 = function () {
  background(colorsRow1[0]);
  image(imgBg[8], width/2, height/2, 1920/imgRatio, 1080/imgRatio);
  drawControls();

  stateNumber = 8;
}

drawState10 = function () {
  background(colorsRow1[0]);
  image(imgBg[9], width/2, height/2, 1920/imgRatio, 1080/imgRatio);
  drawControls();

  stateNumber = 9;
}



// Array of functions (cannot be called before preload because these functions have not yet been created)
  stateFunctions[0] = drawState1;
  stateFunctions[1] = drawState2;
  stateFunctions[2] = drawState3;
  stateFunctions[3] = drawState4;
  stateFunctions[4] = drawState5;
  stateFunctions[5] = drawState6;
  stateFunctions[6] = drawState7;
  stateFunctions[7] = drawState8;
  stateFunctions[8] = drawState9;
  stateFunctions[9] = drawState10;


/*************************************************************************
// Custom functions
**************************************************************************/

function drawControls() {
   // Position the controls

}

function drawInstructMessage() {
  if (drawFunction != drawSplash && drawFunction != drawInstructions) {
    image(imgKeyI, width-60, 50, 150, 150);
    push();
    textSize(28);
    textAlign(RIGHT);
    text(instruct[3], width-100, 50);
    pop();
  }
}


/*************************************************************************
// Control / interaction functions
**************************************************************************/
// Navigate the states
function keyPressed() {

  if (drawFunction === drawState1) {
    if (key === 'w') {
        drawFunction = drawState2;
    }
    if (key === 'a') {
        drawFunction = drawState2;
    }
    if (key === 's') {
        drawFunction = drawState2;
    }
  }
  else if (drawFunction === drawState1) {
    if (keyCode === UP_ARROW) {
        drawFunction = drawState2;
    }
    if (key === 'a') {
        drawFunction = drawState2;
    }
    if (key === 's') {
        drawFunction = drawState2;
    }
  } 
  else if (drawFunction === drawState1) {
      if (key === 'd') {
        drawFunction = drawState2;
    }
  }
  else if (drawFunction === drawState1) {
    if (key === 'w') {
        drawFunction = drawState2;
    }
    if (keyCode === DOWN_ARROW) {
        drawFunction = drawState2;
    }
    if (keyCode === UP_ARROW) {
        drawFunction = drawState2;
    }
  }
  else if (drawFunction === drawState1) {
    if (key === 'w') {
        drawFunction = drawState2;
    }
    if (key === 'a') {
        drawFunction = drawState2;
    }
    if (key === 's') {
        drawFunction = drawState2;
    }
  }
  else if (drawFunction === drawState1) {
    if (key === 's') {
        drawFunction = drawState2;
    }
  }
  else if (drawFunction === drawState1) {
    if (key === 'd') {
        drawFunction = drawState2;
    }
  }
  else if (drawFunction === drawState1) {
    if (key === 'd') {
        drawFunction = drawState2;
    }
  }
  else if (drawFunction === drawState1) {
    if (keyCode === DOWN_ARROW) {
        drawFunction = drawState2;
    }
  }
  else if (drawFunction === drawState1) {
    if (key === 'w') {
        drawFunction = drawState2;
    }
  }

  // I for instructions state
  if (key === 'i') {
      drawFunction = drawInstructions;
  }

  // Escape key to exit instructions state
  if (key === 'Escape') {
    if (drawFunction === drawInstructions) {
      drawFunction = stateFunctions[stateNumber];
    }
  }

  // Fullscreen toggle
  if (key === 'f') {
      let fs = fullscreen();
      fullscreen(!fs);
  }
}

//Splash to instructions to first
function mousePressed() {
  // If the splash or instruction states are up, a mouse click moves it along linearly
  if (drawFunction === drawSplash) {
      drawFunction = drawInstructions;
  }
    else if (drawFunction === drawInstructions) {
        drawFunction = drawLiving;
    }
}
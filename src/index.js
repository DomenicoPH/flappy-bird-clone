import Phaser from "phaser";

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      //gravity: { y: 400 },
      debug: true,
    }
  },
  scene: {
    preload,
    create,
    update
  }
};

// VARIABLES
const VELOCITY = 200;
const PIPES_TO_RENDER = 4;

let bird = null;

let upperPipe = null;
let lowerPipe = null;

const pipeVerticalDistanceRange = [150, 250];
const pipeHorizontalDistanceRange = [380, 420];
let pipeHorizontalDistance = 0;

const flapVelocity = 300;
const initialBirdPosition = { x: config.width / 10, y: config.height / 2 };

// MAIN FUNCTIONS
function preload(){
  this.load.image('sky', 'assets/sky.png');
  this.load.image('bird', 'assets/bird.png');
  this.load.image('pipe', 'assets/pipe.png');
};

function create(){
  this.add.image(0, 0, 'sky').setOrigin(0, 0); //Background
  bird = this.physics.add.sprite(initialBirdPosition.x, initialBirdPosition.y, 'bird').setOrigin(0); //Bird
  bird.body.gravity.y = 400;

  for(let i=0; i<PIPES_TO_RENDER; i++){
    // Create pipes
    pipeHorizontalDistance += Phaser.Math.Between(...pipeHorizontalDistanceRange);
    let pipeVerticalDistance = Phaser.Math.Between(...pipeVerticalDistanceRange);
    let pipeVerticalPosition = Phaser.Math.Between(50, config.height - 50 - pipeVerticalDistance);
    
    upperPipe = this.physics.add.sprite(pipeHorizontalDistance, pipeVerticalPosition, 'pipe').setOrigin(0, 1);
    lowerPipe = this.physics.add.sprite(pipeHorizontalDistance, upperPipe.y + pipeVerticalDistance, 'pipe').setOrigin(0, 0);
    
    upperPipe.body.velocity.x = -VELOCITY;
    lowerPipe.body.velocity.x = -VELOCITY;
  }

  // CONTROLES
  this.input.on('pointerdown', flap); //Click
  this.input.keyboard.on('keydown-SPACE', flap); //Spacebar

};

function update(time, delta){
  if(bird.y > config.height || bird.y < -bird.height){
    restartBirdPosition();
  }
};

// FUNCTIONS
function restartBirdPosition(){
  bird.setPosition(initialBirdPosition.x, initialBirdPosition.y);
  bird.body.velocity.set(0);
};

function flap(){
  bird.body.velocity.y = -VELOCITY;
};





// ***** ---------------------------- Otras funciones...

function pingpong(){
  if(bird.x + bird.width > config.width){ bird.body.velocity.x = -VELOCITY } 
  else if(bird.x < 0){ bird.body.velocity.x = VELOCITY }
}

new Phaser.Game(config);
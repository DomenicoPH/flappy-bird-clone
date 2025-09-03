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
let pipes = null;

let upperPipe = null;
let lowerPipe = null;

const pipeVerticalDistanceRange = [150, 250];
const pipeHorizontalDistanceRange = [380, 420];

const flapVelocity = 300;
const initialBirdPosition = { x: config.width / 10, y: config.height / 2 };

// MAIN FUNCTIONS
function preload(){
  this.load.image('sky', 'assets/sky.png');
  this.load.image('bird', 'assets/bird.png');
  this.load.image('pipe', 'assets/pipe.png');
};

function create(){
  //Background
  this.add.image(0, 0, 'sky').setOrigin(0, 0);
  //Bird
  bird = this.physics.add.sprite(initialBirdPosition.x, initialBirdPosition.y, 'bird').setOrigin(0);
  bird.body.gravity.y = 400;
  //Pipes
  pipes = this.physics.add.group();

  for(let i=0; i<PIPES_TO_RENDER; i++){
    // Create pipes
    const upperPipe = pipes.create(0, 0, 'pipe').setOrigin(0, 1);
    const lowerPipe = pipes.create(0, 0, 'pipe').setOrigin(0, 0);

    placePipe(upperPipe, lowerPipe);
  }

  pipes.setVelocityX(-VELOCITY);

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
function placePipe(uPipe, lPipe){

  const rightMostX = getRightMostPipe();
  const pipeVerticalDistance = Phaser.Math.Between(...pipeVerticalDistanceRange);
  const pipeVerticalPosition = Phaser.Math.Between(50, config.height - 50 - pipeVerticalDistance);
  const pipeHorizontalDistance = Phaser.Math.Between(...pipeHorizontalDistanceRange);
  
  uPipe.x = rightMostX + pipeHorizontalDistance;
  uPipe.y = pipeVerticalPosition;
  lPipe.x = uPipe.x;
  lPipe.y = uPipe.y + pipeVerticalDistance;
  
};

function getRightMostPipe(){

  let rightMostX = 0;
  pipes.getChildren().forEach(pipe => {
    rightMostX = Math.max( pipe.x, rightMostX );
  });
  return rightMostX;

}

function restartBirdPosition(){

  bird.setPosition(initialBirdPosition.x, initialBirdPosition.y);
  bird.body.velocity.set(0);

};

function flap(){
  bird.body.velocity.y = -VELOCITY;
};







// ***** ---------------------------- Otras funciones... *****

function pingpong(){
  if(bird.x + bird.width > config.width){ bird.body.velocity.x = -VELOCITY } 
  else if(bird.x < 0){ bird.body.velocity.x = VELOCITY }
}

new Phaser.Game(config);
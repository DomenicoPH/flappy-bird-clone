import Phaser from "phaser";

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 400 },
      debug: true,
    }
  },
  scene: {
    preload,
    create,
    update
  }
};

function preload(){
  this.load.image('sky', 'assets/sky.png');
  this.load.image('bird', 'assets/bird.png');
};

const VELOCITY = 200;

let bird = null;
const flapVelocity = 300;
const initialBirdPosition = { x: config.width / 10, y: config.height / 2 };

function create(){
  this.add.image(0, 0, 'sky').setOrigin(0, 0); //Background
  bird = this.physics.add.sprite(initialBirdPosition.x, initialBirdPosition.y, 'bird').setOrigin(0, 0); //Bird

  // CONTROLES
  this.input.on('pointerdown', flap); //Click
  this.input.keyboard.on('keydown-SPACE', flap); //Spacebar

};

function update(time, delta){
  if(bird.y > config.height || bird.y < -bird.height){
    restartBirdPosition();
  }
};

// FUNCIONES

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
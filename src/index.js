import Phaser from "phaser";

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      //gravity: { y: 200 },
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

let bird = null;
let totalDelta = null;

const VELOCITY = 200;

function create(){
  this.add.image(0, 0, 'sky').setOrigin(0, 0);
  bird = this.physics.add.sprite(config.width / 10 , config.height / 2, 'bird').setOrigin(0, 0);
  bird.body.velocity.x = VELOCITY;
};

function update(time, delta){
  pingpong();
};

// Otras funciones...
function pingpong(){
  if(bird.x + bird.width > config.width){ bird.body.velocity.x = -VELOCITY } 
  else if(bird.x < 0){ bird.body.velocity.x = VELOCITY }
}

new Phaser.Game(config);
import Phaser from "phaser";

// * WebGL (Web Graphics Library) JS API for rendering 2D and 3D graphics

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
  },
  scene: {
    preload,
    create
  }
};

function preload(){
  //debugger
  this.load.image('sky', 'assets/sky.png');
};

function create(){
  //debugger
  this.add.image(0, 0, 'sky').setOrigin(0, 0);
};

new Phaser.Game(config);
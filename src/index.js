import Phaser from "phaser";
import PreloadScene from "./scenes/PreloadScene";
import MenuScene from "./scenes/MenuScene";
import PlayScene from "./scenes/PlayScene";
import ScoreScene from "./scenes/ScoreScene";

const WIDTH = 800;
const HEIGHT = 600;
const BIRD_POSITION = { x: WIDTH * 0.1, y: HEIGHT / 2 };

const SHARED_CONFIG = {
  width: WIDTH,
  height: HEIGHT,
  startPosition: BIRD_POSITION
};

const Scenes = [ PreloadScene, MenuScene, PlayScene, ScoreScene ];
const createScene = scene => new scene(SHARED_CONFIG);
const initScenes = () => Scenes.map(createScene);

const config = {
  
  type: Phaser.AUTO,
  ...SHARED_CONFIG,
  physics: {
    default: 'arcade',
    arcade: {
      //gravity: { y: 400 },
      debug: true,
    }
  },
  scene: initScenes()

};

new Phaser.Game(config);
import Phaser from "phaser";

const VELOCITY = 200;
const GRAVITY = 400;
const PIPES_TO_RENDER = 4;

class PlayScene extends Phaser.Scene {

    constructor(config) {
        super("PlayScene");
        this.config = config;

        this.bird = null;
        this.pipes = null;

        this.pipeHorizontalDistance = 0;
        this.pipeVerticalDistanceRange = [150, 250];
        this.pipeHorizontalDistanceRange = [500, 550];

        this.flapVelocity = 250;
    }

    preload(){
        this.load.image('sky', 'assets/sky.png');
        this.load.image('bird', 'assets/bird.png');
        this.load.image('pipe', 'assets/pipe.png');
    };
    
    create(){
        this.add.image(0, 0, 'sky').setOrigin(0);
        this.bird = this.physics.add.sprite(this.config.startPosition.x, this.config.startPosition.y, 'bird').setOrigin(0);
        this.bird.body.gravity.y = GRAVITY;
        this.pipes = this.physics.add.group();

        for(let i = 0; i < PIPES_TO_RENDER; i++){ // Create pipes
          const upperPipe = this.pipes.create(0, 0, 'pipe').setOrigin(0, 1);
          const lowerPipe = this.pipes.create(0, 0, 'pipe').setOrigin(0, 0);
          this.placePipe(upperPipe, lowerPipe);
        }
    
        this.pipes.setVelocityX(-VELOCITY);
    
        // CONTROLES
        this.input.on('pointerdown', this.flap, this); //Click
        this.input.keyboard.on('keydown-SPACE', this.flap, this); //Spacebar
    };

    update(){
        if(this.bird.y > this.config.height || this.bird.y < -this.bird.height){
          this.restartBirdPosition();
        }

        this.recyclePipes();
    };

    // --- Métodos (Funciones) ---

    placePipe(uPipe, lPipe){

      const rightMostX = this.getRightMostPipe();
      const pipeVerticalDistance = Phaser.Math.Between(...this.pipeVerticalDistanceRange);
      const pipeVerticalPosition = Phaser.Math.Between(20, this.config.height - 20 - pipeVerticalDistance);
      const pipeHorizontalDistance = Phaser.Math.Between(...this.pipeHorizontalDistanceRange);

      uPipe.x = rightMostX + pipeHorizontalDistance;
      uPipe.y = pipeVerticalPosition;
      lPipe.x = uPipe.x;
      lPipe.y = uPipe.y + pipeVerticalDistance;

      //console.log('Pipe X:', uPipe.x, 'Y:', uPipe.y);
      
    };// Posiciona las pipes

    recyclePipes(){

      const tempPipes = [];
      this.pipes.getChildren().forEach(pipe => {
        if(pipe.getBounds().right <= 0){
          tempPipes.push(pipe);
          if(tempPipes.length === 2){
            this.placePipe(...tempPipes);
          }
        }
      });

    };// Recicla las pipes

    getRightMostPipe(){

      let rightMostX = 0;
      this.pipes.getChildren().forEach(pipe => {
        rightMostX = Math.max( pipe.x, rightMostX );
      });
      return rightMostX;

    };// Obtiene la posición X de la pipe más a la derecha

    restartBirdPosition(){

      this.bird.x = this.config.startPosition.x;
      this.bird.y = this.config.startPosition.y;
      this.bird.body.velocity.y = 0;

    };// Reinicia la posición del pájaro

    flap(){
      this.bird.body.velocity.y = -this.flapVelocity;
    };// Hace que el pájaro vuele

}

export default PlayScene;
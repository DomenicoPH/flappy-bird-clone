import BaseScene from "./BaseScene";

const VELOCITY = 250;
const GRAVITY = 600;
const PIPES_TO_RENDER = 4;

class PlayScene extends BaseScene {

    constructor(config) {
        super("PlayScene", config);

        this.bird = null;
        this.pipes = null;

        this.pipeHorizontalDistance = 0;
        this.pipeVerticalDistanceRange = [150, 250];
        this.pipeHorizontalDistanceRange = [500, 550];

        this.flapVelocity = 300;

        this.score = 0;
        this.scoreText = '';
    }
    
    create(){
        super.create();
        this.createBird();
        this.createPipes();
        this.createColliders();
        this.createScore();
        this.createPause();
        this.handleInputs();
        this.listenToEvents();
    };

    update(){
        this.checkGameStatus();
        this.recyclePipes();
    };

    listenToEvents(){
      if(this.pauseEvent) return;
      this.pauseEvent = this.events.on('resume', () => {

        this.initialTime = 3;
        this.countDownText = this.add.text(...this.screenCenter, `Fly in: ${this.initialTime}`, this.fontOptions).setOrigin(0.5);
        this.TimedEvent = this.time.addEvent({
          delay: 1000,
          callback: this.countDown,
          callbackScope: this,
          loop: true
        })

      })
    }

    // Custom Functions

    countDown(){
      this.initialTime--;
      this.countDownText.setText(`Fly in: ${this.initialTime}`);
      if(this.initialTime <= 0){
        this.countDownText.setText('');
        this.physics.resume();
        this.TimedEvent.remove();
      }
    };// Cuenta regresiva

    createBird(){
        this.bird = this.physics.add.sprite(this.config.startPosition.x, this.config.startPosition.y, 'bird').setOrigin(0);
        this.bird.body.gravity.y = GRAVITY;
        this.bird.setCollideWorldBounds(true);
    };// Crea el pájaro

    createPipes(){
        this.pipes = this.physics.add.group();

        for(let i = 0; i < PIPES_TO_RENDER; i++){ // Create pipes
          const upperPipe = this.pipes.create(0, 0, 'pipe').setImmovable(true).setOrigin(0, 1);
          const lowerPipe = this.pipes.create(0, 0, 'pipe').setImmovable(true).setOrigin(0, 0);
          this.placePipe(upperPipe, lowerPipe);
        }
    
        this.pipes.setVelocityX(-VELOCITY);
    };// Crea las pipes

    createColliders(){
      this.physics.add.collider( this.bird, this.pipes, this.gameOver, null, this );
    }// Crea la colisión entre el pájaro y las pipes

    createScore(){
      this.score = 0;
      const bestScore = localStorage.getItem('bestScore');
      this.scoreText = this.add.text(16, 16, `Score: ${this.score}`, { fontFamily: 'Arial', fontSize: '32px', fill: '#000' });
      this.bestScoreText = this.add.text(16, 52, `Best Score: ${bestScore || 0}`, { fontFamily: 'Arial', fontSize: '18px', fill: '#000' });
    }// Crea el texto de la puntuación

    createPause(){
      const pauseButton = this.add.image(this.config.width - 10, this.config.height - 10, 'pause').setOrigin(1).setScale(3).setInteractive();
      const pauseGame = () => {
        this.physics.pause();
        this.scene.pause();
        this.scene.launch('PauseScene');
      }
      pauseButton.on('pointerdown', pauseGame);//Pausa con Click
      this.input.keyboard.on('keydown-P', pauseGame);//Pausa con tecla P
    };// Crea el botón de pausa

    handleInputs(){
        // CONTROLES
        this.input.on('pointerdown', this.flap, this); //Click
        this.input.keyboard.on('keydown-SPACE', this.flap, this); //Spacebar
    };

    checkGameStatus(){
        if(this.bird.getBounds().bottom >= this.config.height || this.bird.getBounds().top <= 0){  
          this.gameOver();
        }
    };// Comprueba si el pájaro ha chocado con el suelo o el techo

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
            this.increaseScore();
            this.saveBestScore();
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

    saveBestScore(){
      const bestScoreText = localStorage.getItem('bestScore');
      const bestScore = bestScoreText && parseInt(bestScoreText, 10);
      if(!bestScore || this.score > bestScore){
        localStorage.setItem('bestScore', this.score);
      }
    }// Guardar mejor puntaje en localStorage

    gameOver(){

      this.physics.pause();
      this.bird.setTint(0xEE4824);

      this.saveBestScore();

      this.time.addEvent({
        delay: 1000,
        callback: () => {
          this.scene.restart();
        },
        loop: false
      });

    };// Reinicia el juego

    flap(){
      this.bird.body.velocity.y = -this.flapVelocity;
    };// Hace que el pájaro vuele

    increaseScore(){
      this.score++;
      this.scoreText.setText(`Score: ${this.score}`);
    }// Aumenta la puntuación

}

export default PlayScene;
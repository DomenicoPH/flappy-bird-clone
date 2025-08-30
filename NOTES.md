# Phaser

### Config
El objeto config es una instancia de Phaser.Types.Core.GameConfig. Se pasa como argumento al constructor de new Phaser.Game(config) y contiene toda la configuración necesaria para levantar el juego.

    import Phaser from 'phaser';

    const config = {
      type: Phaser.AUTO,           // Usa WebGL si está disponible, si no, Canvas
      width: 800,
      height: 600,
      backgroundColor: '#1d1d1d',
      physics: {
        default: 'arcade',
      },
      scene: {
        preload,
        create,
        update
      }
    };

    const game = new Phaser.Game(config);

### Preload
Precargado de assets. Esta función se ejecuta antes de que la escena comience. Su objetivo es precargar todos los assets que vas a usar: imágenes, sonidos, spritesheets, fuentes, etc.

    function preload(){
        this.load.image('background', 'assets/background.png');
        this.load.image('player', 'assets/player.png');
    };

### Create
Creación de objetos en el viewport. Una vez que los recursos están cargados, create() se ejecuta para construir los elementos visuales y lógicos del juego.

    function create(){
        this.add.image(0, 0, 'background').setOrigin(0, 0);
        const player = this.physics.add.sprite(config.width / 10 , config.height / 2, 'bird').setOrigin(0, 0);
    };

    // * this.add.image(pos X, pos Y, ref).setOrigin(pox X, pos Y);

### Update
La función update en Phaser es el motor de tiempo real de tu juego. Se ejecuta automáticamente una vez por frame (normalmente 60 veces por segundo) mientras la escena está activa. Su propósito es manejar toda la lógica que debe evaluarse y cambiarse constantemente: movimiento, colisiones, animaciones, entrada del jugador, físicas, etc.


import Phaser from "phaser";

class BaseScene extends Phaser.Scene{
    
    constructor(key, config){
        super(key);
        this.config = config;
    }

    create(){
        this.createBG();
    }

    // Funciones

    createBG(){
        this.add.image(0, 0, 'sky').setOrigin(0);
    };// Crea el fondo

}
export default BaseScene;
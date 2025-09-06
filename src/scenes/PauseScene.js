import BaseScene from "./BaseScene";

class PauseScene extends BaseScene {

    constructor(config){
        super('PauseScene', config);
        this.menu = [
            {scene: 'PlayScene', text: 'Continue'},
            {scene: 'MenuScene', text: 'Exit'},
        ]
    }

    create(){
        super.create();
        this.createMenu(this.menu, this.setupMenuEvents.bind(this));
    }

    // Custom Functions

    setupMenuEvents(menuItem){
        const textGO = menuItem.textGO;
        textGO.setInteractive();
        
        textGO.on('pointerover', () => {
            textGO.setStyle({ fill: '#ff0' })
        });

        textGO.on('pointerout', () => {
            textGO.setStyle({ fill: '#ffF' })
        });

        textGO.on('pointerup', () => {
            console.log('clicking option')
        });
    }
}

export default PauseScene;
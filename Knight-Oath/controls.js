class controls extends Phaser.Scene {
    constructor() {
      super("controls");
    }
    preload() {
        this.load.image('cont', 'assets/images/cont.png');
    }
    create() {
      this.add.image(700, 380, 'cont');

      const contolsButton = this.add.text(1250, 100, 'Go Back', { fill: '#ffb6c1' });
      contolsButton.setInteractive();
      contolsButton.on('pointerdown', () => { 
        
        this.scene.start("startmenu");
      });
    }
  }
  
  
var winv1;
class winscreen2 extends Phaser.Scene {
    constructor() {
      super("winscreen2");
    }
    preload() {
        this.load.image('ca', 'assets/images/OATHH.png');
        this.load.audio('winvoice1', 'assets/audio/winscreenvoice.mp3');


    }

    create() {
    this.add.image(700, 380, 'ca');
    winv1 = this.sound.add('winvoice1', {
        loop:false
      }) 
  
    winv1.play();
    
  

    const playagain = this.add.text(1250, 600, 'Play Again?', { fill: '#ffb6c1' });
    playagain.setInteractive();
    playagain.on('pointerdown', () => { 
      winv1.stop();
     
      this.scene.start("startmenu");
    });
    }
  }
  
  
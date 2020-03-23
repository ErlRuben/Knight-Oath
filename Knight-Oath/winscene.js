var winv;
class winscene extends Phaser.Scene {
    constructor() {
      super("winscene");
    }
    preload() {
        this.load.image('castle', 'assets/images/endstory1.png');
        this.load.audio('winvoice', 'assets/audio/winscenevoice.mp3');

   

    }

    create() {
    this.add.image(700, 380, 'castle');

    winv = this.sound.add('winvoice', {
        loop:false
      }) 
    winv.play();
    const playagain = this.add.text(1250, 600, 'Next', { fill: '#ffb6c1' });
    playagain.setInteractive();
    playagain.on('pointerdown', () => { 
    winv.stop();
    this.scene.start("winscreen2");
    });
    }
  }
  
  
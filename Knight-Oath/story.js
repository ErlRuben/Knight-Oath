
var storvoice;
class story extends Phaser.Scene {
    constructor() {
      super("story");
    }
    preload() {
        this.load.image('st', 'assets/images/story.png');
        this.load.audio('storyvoice', 'assets/audio/storyvoice.mp3');

   

    }

    create() {

    this.add.image(700, 380, 'st');
    

    storvoice = this.sound.add('storyvoice', {
      loop:true
    }) 

    storvoice.play();
    const storyButton = this.add.text(1200, 600, 'Start Journey!', { fill: '#ffb6c1' });
    storyButton.setInteractive();
    storyButton.on('pointerdown', () => { 
      storvoice.stop();
      this.scene.start("playgame");
    });
    }
  }
  
  
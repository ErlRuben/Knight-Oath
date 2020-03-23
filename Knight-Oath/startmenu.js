var sta;
class startmenu extends Phaser.Scene {
  constructor() {
    super("startmenu");

  }
  preload(){
    this.load.image('startpage', 'assets/images/titlescreen.png');

  }
  create() {
    this.add.image(700, 380, 'startpage');
    sta = this.sound.add('menu', {
      loop:false
    }) 
    sta.play();
    const menuButton = this.add.text(650, 500, 'Start Game', { fill: '#ffb6c1' });
    menuButton.setInteractive();
    menuButton.on('pointerdown', () => { 
      this.scene.start("story");
    });

    const goControls = this.add.text(1250, 100, 'Controls', { fill: '#ffb6c1' });
    goControls.setInteractive();
    goControls.on('pointerdown', () => { 
      
      this.scene.start("controls");
    });
    

  }
}


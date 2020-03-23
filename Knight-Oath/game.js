var config = {
  type: Phaser.AUTO,
    width: 1400,
    height: 768,
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 0},
         
        }
    },
  scene: [startmenu,story, controls, Scene2, Scene3, winscene, winscreen2]
}


var game = new Phaser.Game(config);

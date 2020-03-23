var map;
var player;
var deadenemy;
var talkingchar;
var dash;
var enemyCollidedLeftt, enemyCollidedLeftt1, enemyCollidedLeftt2, enemyCollidedLeftt3, enemyCollidedLeftt4;
var enemyCollidedRightt, enemyCollidedRightt1, enemyCollidedRightt2, enemyCollidedRightt3, enemyCollidedRightt4;
var groundLayer, coinLayer,castleLayer, 
grassLayer, grassLayer1, castleLayer1, castleLayer2,
treesLayer,treesLayer1,treesLayer2;

var health;
var healthy = 100000;

var slain;
var slained = 0;

var energy;
var energies = 30;

var introText;
var gameStarted;

var logoui;
var charui;
var tired;
var replenished;
var died;

var sure;
var quit;
var reallyno;
var reallyyes;
var sensorDoor;


var enemies, enemies1, enemies2, enemies3, enemies4;
class Scene2 extends Phaser.Scene{
  constructor(){
    super("playgame");
    // this function will be called when the player touches a coin

  }
  preload() {
      // map made with Tiled in JSON format
      this.load.tilemapTiledJSON('map', 'assets/map/map.json');
      // tiles in spritesheet 
      this.load.spritesheet('tiles', 'assets/images/tiles.png', {frameWidth: 50, frameHeight: 50});
      this.load.spritesheet('cast', 'assets/images/Caste.png', {frameWidth: 50, frameHeight: 50});
      this.load.spritesheet('tres', 'assets/images/tres.png', {frameWidth: 50, frameHeight: 50});

      this.load.image('charui', 'assets/images/charui.png');
      this.load.image('logoui', 'assets/images/logoui.png');
      this.load.image('quit', 'assets/images/quit.png');
      this.load.image('coin', 'assets/images/coinGold.png');
      this.load.image('grass', 'assets/images/grass.png');
      this.load.image('enemycollide', 'assets/character/enemycollider.png');

      this.load.audio('starti', 'assets/audio/playgame.mp3');
      this.load.audio('chartalk', 'assets/audio/chartalk.mp3');
      this.load.audio('deadenemy', 'assets/audio/flyerdead.mp3');
      this.load.audio('dash', 'assets/audio/dash.mp3');

      // player animations
      this.load.spritesheet(
        "player",
        "assets/character/char.png",
        {
          frameWidth: 27.9,
          frameHeight: 48
        }
      );
      this.load.spritesheet(
        "charge",
        "assets/character/charge.png",
        {
          frameWidth: 55,
          frameHeight: 48
        }
      );
      this.load.image(
        "enemy",
        "assets/images/flyer.png",
 
      );
    
      this.load.image('pepememe', 'assets/images/yousure.png');

  }
  create() {
    // load the map
    
   
    map = this.make.tilemap({key: 'map'});
    
    // tiles for the ground layer
    var groundTiles = map.addTilesetImage('tiles','tiles');
    var grassTiles = map.addTilesetImage('grass','grass');
    var castleTiles = map.addTilesetImage('Caste','cast');
    var treeTiles = map.addTilesetImage('tres','tres');


    // create the ground layer
    
    grassLayer = map.createStaticLayer(0, grassTiles, 0, 0);
    groundLayer = map.createDynamicLayer('World', groundTiles, 0, 0);
    grassLayer1 = map.createDynamicLayer('PATHGRASS', grassTiles, 0, 0);

    castleLayer1 = map.createDynamicLayer('Pathway', castleTiles, 0, 0);
    castleLayer2 = map.createDynamicLayer('CastleDoor', castleTiles, 0, 0);
    castleLayer = map.createDynamicLayer('Castle', castleTiles, 0, 0);

    treesLayer = map.createDynamicLayer('Treegroup', treeTiles, 0, 0);
    treesLayer1 = map.createDynamicLayer('Treegroup1', treeTiles, 0, 0);
    treesLayer2 = map.createDynamicLayer('Treegroup2', treeTiles, 0, 0);

   
    // the player will collide with this layer
    castleLayer.setCollisionByExclusion([-1]);
    castleLayer1.setCollisionByExclusion([-1]);
    castleLayer2.setCollisionByExclusion([-1]);
    treesLayer.setCollisionByExclusion([-1]);
    treesLayer1.setCollisionByExclusion([-1]);
    treesLayer2.setCollisionByExclusion([-1]);

    groundLayer.setCollisionByExclusion([-1]);
    //grassLayer.setCollisionByExclusion([-1]);
    
  
    // set the boundaries of our game world
    this.physics.world.bounds.width = groundLayer.width;
    this.physics.world.bounds.height = groundLayer.height;
    this.physics.world.bounds.width = castleLayer.width;
    this.physics.world.bounds.height = castleLayer.height;
    this.physics.world.bounds.width = treesLayer.width;
    this.physics.world.bounds.height = treesLayer.height;
    this.physics.world.bounds.width = treesLayer1.width;
    this.physics.world.bounds.height = treesLayer1.height;
    this.physics.world.bounds.width = treesLayer2.width;
    this.physics.world.bounds.height = treesLayer2.height;
    


    
    talkingchar = this.sound.add('chartalk', {
      loop:false
    }) 
    talkingchar.play();
    // create the player sprite    
    player = this.physics.add.sprite(32, 2250, "player");
    enemies = this.physics.add.image(1000, 1950, "enemy");
    enemies1 = this.physics.add.image(520, 1000, "enemy");
    enemies2 = this.physics.add.image(1020, 650, "enemy");
    enemies3 = this.physics.add.image(1520, 1150, "enemy");
    enemies4 = this.physics.add.image(2180, 1900, "enemy");
    

    enemyCollidedLeftt = this.physics.add.image(750, 1950, "enemycollide");
    enemyCollidedRightt = this.physics.add.image(1000, 1950, "enemycollide");

    enemyCollidedLeftt1 = this.physics.add.image(320, 1000, "enemycollide");
    enemyCollidedRightt1 = this.physics.add.image(900, 1000, "enemycollide");

    enemyCollidedLeftt2 = this.physics.add.image(820, 650, "enemycollide");
    enemyCollidedRightt2 = this.physics.add.image(1220, 650, "enemycollide");

    enemyCollidedLeftt3 = this.physics.add.image(1520, 1000, "enemycollide");
    enemyCollidedRightt3 = this.physics.add.image(1520, 1300, "enemycollide");

    enemyCollidedLeftt4 = this.physics.add.image(2180, 1470, "enemycollide");
    enemyCollidedRightt4 = this.physics.add.image(2180, 2100, "enemycollide");
    //player.setBounce(0.2); // our player will bounce from items
    player.setCollideWorldBounds(true);
    enemyCollidedLeftt.setCollideWorldBounds(true);
    enemyCollidedRightt.setCollideWorldBounds(true);
    enemyCollidedLeftt1.setCollideWorldBounds(true);
    enemyCollidedRightt1.setCollideWorldBounds(true);
    enemyCollidedLeftt2.setCollideWorldBounds(true);
    enemyCollidedRightt2.setCollideWorldBounds(true);
    enemyCollidedLeftt3.setCollideWorldBounds(true);
    enemyCollidedRightt3.setCollideWorldBounds(true);
    enemyCollidedLeftt4.setCollideWorldBounds(true);
    enemyCollidedRightt4.setCollideWorldBounds(true);
    
    enemies.setImmovable();
    enemies1.setImmovable();
    enemies2.setImmovable();
    enemies3.setImmovable();
    enemies4.setImmovable();

    enemyCollidedLeftt.setImmovable();
    enemyCollidedRightt.setImmovable();
    enemyCollidedLeftt1.setImmovable();
    enemyCollidedRightt1.setImmovable();
    enemyCollidedLeftt2.setImmovable();
    enemyCollidedRightt2.setImmovable();
    enemyCollidedLeftt3.setImmovable();
    enemyCollidedRightt3.setImmovable();
    enemyCollidedLeftt4.setImmovable();
    enemyCollidedRightt4.setImmovable();
    // enemies.setCollideWorldBounds(true);  // don't go out of the map    
    //enemies.body.setImmovable();

    // small fix to our player images, we resize the physics body object slightly
  


    // player will collide with the level tiles 
    
    this.physics.add.collider(groundLayer, player);
    this.physics.add.collider(castleLayer, player);
    this.physics.add.collider(enemies, enemyCollidedLeftt);
    this.physics.add.collider(enemies, enemyCollidedRightt);

    this.physics.add.collider(enemies1, enemyCollidedLeftt1);
    this.physics.add.collider(enemies1, enemyCollidedRightt1);

    this.physics.add.collider(enemies2, enemyCollidedLeftt2);
    this.physics.add.collider(enemies2, enemyCollidedRightt2);

    this.physics.add.collider(enemies3, enemyCollidedLeftt3);
    this.physics.add.collider(enemies3, enemyCollidedRightt3);

    this.physics.add.collider(enemies4, enemyCollidedLeftt4);
    this.physics.add.collider(enemies4, enemyCollidedRightt4);

    this.physics.add.collider(treesLayer, player);
    this.physics.add.collider(treesLayer, enemies);
    this.physics.add.collider(treesLayer, enemies1);
    this.physics.add.collider(treesLayer, enemies2);
    this.physics.add.collider(treesLayer, enemies3);
    this.physics.add.collider(treesLayer, enemies4);

    this.physics.add.collider(treesLayer1, player);
    this.physics.add.collider(treesLayer1, enemies);
    this.physics.add.collider(treesLayer1, enemies1);
    this.physics.add.collider(treesLayer1, enemies2);
    this.physics.add.collider(treesLayer1, enemies3);
    this.physics.add.collider(treesLayer1, enemies4);

    this.physics.add.collider(treesLayer2, player);
    this.physics.add.collider(treesLayer2, enemies);
    this.physics.add.collider(treesLayer2, enemies1);
    this.physics.add.collider(treesLayer2, enemies2);
    this.physics.add.collider(treesLayer2, enemies3);
    this.physics.add.collider(treesLayer2, enemies4);


    this.physics.add.collider(player, enemies);

    this.physics.add.collider(player, enemies1);
    this.physics.add.collider(player, enemies2);
    this.physics.add.collider(player, enemies3);
    this.physics.add.collider(player, enemies4);
    

    this.physics.add.overlap(enemies, treesLayer);
    this.physics.add.overlap(enemies, treesLayer1);
    this.physics.add.overlap(enemies, treesLayer2);

    this.physics.add.overlap(enemies1, treesLayer);
    this.physics.add.overlap(enemies1, treesLayer1);
    this.physics.add.overlap(enemies1, treesLayer2);

    this.physics.add.overlap(enemies2, treesLayer);
    this.physics.add.overlap(enemies2, treesLayer1);
    this.physics.add.overlap(enemies2, treesLayer2);

    this.physics.add.overlap(enemies3, treesLayer);
    this.physics.add.overlap(enemies3, treesLayer1);
    this.physics.add.overlap(enemies3, treesLayer2);

    this.physics.add.overlap(enemies4, treesLayer);
    this.physics.add.overlap(enemies4, treesLayer1);
    this.physics.add.overlap(enemies4, treesLayer2);


    // when the player overlaps with a tile with index 17, collectCoin 
    // will be called    
    //this.physics.add.overlap(this.bullet, this.spawns, this.onMeetEnemy, false, this);
   

      //walking
      this.anims.create({
        key: "left",
        frames: this.anims.generateFrameNumbers("player", { start: 3, end: 5 }),
        frameRate: 10,
        repeat: -1
      });
      this.anims.create({
        key: "down",
        frames: this.anims.generateFrameNumbers("player", { start: 0, end: 2 }),
        frameRate: 10,
        repeat: -1
      });
      this.anims.create({
        key: "right",
        frames: this.anims.generateFrameNumbers("player", { start: 6, end: 8 }),
        frameRate: 10,
        repeat: -1
      });
      this.anims.create({
        key: "up",
        frames: this.anims.generateFrameNumbers("player", { start: 9, end: 11 }),
        frameRate: 10,
        repeat: -1
      });
      this.anims.create({
        key: "idle",
        frames: this.anims.generateFrameNumbers("player", { start: 1, end: 1 }),
      });
      //charging
      this.anims.create({
        key: "chargeleft",
        frames: this.anims.generateFrameNumbers("charge", { start: 1, end: 1 }),
        
       
      });
      this.anims.create({
        key: "chargedown",
        frames: this.anims.generateFrameNumbers("charge", { start: 0, end: 0 }),
    
      });
      this.anims.create({
        key: "chargeright",
        frames: this.anims.generateFrameNumbers("charge", { start: 2, end: 2 }),
 
      });
      this.anims.create({
        key: "chargeup",
        frames: this.anims.generateFrameNumbers("charge", { start: 3, end: 3 }),

      });


      this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
      this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
      this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
      this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
      this.keyT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.T);
      this.keyP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);

      this.keyEnter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
      this.keyShift = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);
      this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    //this.cursors = this.input.keyboard.addKeys({ 'up': Phaser.Input.Keyboard.KeyCodes.W, 'down': Phaser.Input.Keyboard.KeyCodes.S, 'left': Phaser.Input.Keyboard.KeyCodes.A, 'right': Phaser.Input.Keyboard.KeyCodes.D  });

    this.physics.add.overlap(player, enemies, collideWithEnemy, null, this);

    this.physics.add.overlap(player, enemies1, collideWithEnemy1, null, this);
    this.physics.add.overlap(player, enemies2, collideWithEnemy2, null, this);
    this.physics.add.overlap(player, enemies3, collideWithEnemy3, null, this);
    this.physics.add.overlap(player, enemies4, collideWithEnemy4, null, this);

    this.physics.add.overlap(enemyCollidedLeftt, enemies, enemyCollidedLeft, null, this);
    this.physics.add.overlap(enemyCollidedRightt, enemies, enemyCollidedRight, null, this);

    this.physics.add.overlap(enemyCollidedLeftt1, enemies1, enemyCollidedLeft1, null, this);
    this.physics.add.overlap(enemyCollidedRightt1, enemies1, enemyCollidedRight1, null, this);
    
    this.physics.add.overlap(enemyCollidedLeftt2, enemies2, enemyCollidedLeft2, null, this);
    this.physics.add.overlap(enemyCollidedRightt2, enemies2, enemyCollidedRight2, null, this);

    this.physics.add.overlap(enemyCollidedLeftt3, enemies3, enemyCollidedLeft3, null, this);
    this.physics.add.overlap(enemyCollidedRightt3, enemies3, enemyCollidedRight3, null, this);

    this.physics.add.overlap(enemyCollidedLeftt4, enemies4, enemyCollidedLeft4, null, this);
    this.physics.add.overlap(enemyCollidedRightt4, enemies4, enemyCollidedRight4, null, this);
    // // set bounds so the camera won't go outside the game world
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    // // make the camera fol low the player
    this.cameras.main.startFollow(player);
    //enemy
    

    
    // // set background color, so the sky is not black    
    //this.cameras.main.setBackgroundColor('#ccccff');
    var style = { font: "15px Arial", fill: "#ff0044", align: "center", backgroundColor:"black"};

    introText = this.add.text(
      50,
      520,
  
      "I need to kill all of his minions \n to move to the next level!!!.",
          style)
    

    this.input.on("pointerdown", function() {
      if (!gameStarted) {

        startGame();
      }
    });
    charui = this.add.image(400, 290, 'charui');
    logoui = this.add.image(720, 65, 'logoui');

    // // this text will show the score
    health = this.add.text(180, 90, healthy, {
          fontSize: '20px',
          fill: 'green',
          backgroundColor: 'green'
      });
    slain = this.add.text(220, 58, slained, {
      fontSize: '20px',
      fill: '#FF0000',
      
    });
    energy = this.add.text(45, 150, energies, {
      fontSize: '20px',
      fill: '#add8e6',
      
    });
    tired = this.add.text(375, 150, '         Your Knight is Tired \n      press T to replenish energy \nbut remember it will affect your health', {
      fontSize: '30px',
      fill: 'red',
      backgroundColor: 'black'
      
    });
    replenished = this.add.text(340, 150, 'Energy Replenished! press ENTER to continue!', {
      fontSize: '30px',
      fill: 'red',
      backgroundColor: 'black'
      
    });
    died = this.add.text(430, 150, 'Knight died of Tiredness', {
      fontSize: '40px',
      fill: 'red',
      backgroundColor: 'black'
      
    });
    const quit = this.add.image(1350, 50, 'quit');
    quit.setInteractive();
    sure = quit.on('pointerdown', () => { 
        this.add.image(720, 330, 'pepememe');

        this.add.text(650, 400, 'You sure Knight?', { fill: '#ffb6c1' });
        const reallyyes = this.add.text(680, 430, 'YES!', { fill: '#ffb6c1' });
        reallyyes.setInteractive();
        reallyyes.on('pointerdown', () => { 
        this.scene.start("startmenu");
        });
        const reallyno = this.add.text(750, 430, 'NO!', { fill: '#ffb6c1' });
        reallyno.setInteractive();
        reallyno.on('pointerdown', () => { 
    
            this.scene.start("playGame");
        });
    });
     // fix the text to the camera
    replenished.setScrollFactor(0);
    tired.setScrollFactor(0);
    slain.setScrollFactor(0);
    health.setScrollFactor(0);
    energy.setScrollFactor(0);
    died.setScrollFactor(0);

    introText.setScrollFactor(0);
    charui.setScrollFactor(0);
    logoui.setScrollFactor(0);
    sure.setScrollFactor(0);
    quit.setScrollFactor(0);
    died.visible = false;
    tired.visible = false;
    replenished.visible = false;
    enemies1.setVelocityX(100);
    enemies2.setVelocityX(100);
    enemies3.setVelocityY(100);
    enemies4.setVelocityY(-100);


  }
  update(time, delta) {
    // function enemyCollidedLeft() {
    //   enemies.body.setVelocityX(-100);
    //   enemies.flipX = true;
    // }
    
    // function enemyCollidedRight() {
    //   enemies.body.setVelocityX(100);
    //   enemies.flipX = false;
    // } treeLayer left treelayer1 right
    



    
    player.setVelocity(0, 0);

    //wasd
    if (this.keyW.isDown) {
      //health.setText(healthy - 10000)
      player.body.setVelocityY(-100);
      player.anims.play('up', true);
      startGame();
      if (this.keySpace.isDown) {
        energyReducer();
        dash = this.sound.add('dash', {
          loop:false
        }) 
        dash.play();
        player.body.setVelocityY(-400);
        player.anims.play('chargeup', true);
        startGame();
      } else if (this.keyShift.isDown) {
        player.body.setVelocityY(-250);
        player.anims.play('up', true);
        startGame();
      } 

    }
    else if (this.keyS.isDown) {
      
      player.body.setVelocityY(100);
      player.anims.play('down', true);
      startGame();
      if (this.keySpace.isDown) {
        energyReducer();
        dash = this.sound.add('dash', {
          loop:false
        }) 
        dash.play();
        player.body.setVelocityY(400);
        player.anims.play('chargedown', true);
        startGame();
      } else if (this.keyShift.isDown) {
        player.body.setVelocityY(250);
        player.anims.play('down', true);
        startGame();
      } 

    }
    else if (this.keyA.isDown) {
      
      player.body.setVelocityX(-100);
      player.anims.play('left', true); 
      startGame();
      if (this.keySpace.isDown) {
        energyReducer();
        dash = this.sound.add('dash', {
          loop:false
        }) 
        dash.play();
        player.body.setVelocityX(-400);
        player.anims.play('chargeleft', true);
        startGame();
      } else if (this.keyShift.isDown) {
        player.body.setVelocityX(-250);
        player.anims.play('left', true);
        startGame();
      } 
     

    }
    else if (this.keyD.isDown) {
      
      player.body.setVelocityX(100);
      player.anims.play('right', true);
        startGame();
        if (this.keySpace.isDown) {
          dash = this.sound.add('dash', {
            loop:false
          }) 
          dash.play();
          energyReducer();
          player.anims.play('chargeright', true);
          player.body.setVelocityX(400);
          startGame();
        }else if (this.keyShift.isDown) {
          player.body.setVelocityX(250);
          player.anims.play('right', true);
          startGame();
        } 
        
    } 
    else if (this.keyT.isDown) {
      energyEmpty(); 
      
    } else if (this.keyEnter.isDown) {
      minusHealth(); 
    }else if (this.keyP.isDown) {

      this.scene.start("playgame1"); 
      restart();
    }else {
      player.body.setVelocityX(0);

      player.anims.play('idle', true);
    }
  }
  
 
}

//this.keyEnter.enable = false;


function collideWithEnemy(player, enemies) {
  if (collideWithEnemy) {
    deadenemy = this.sound.add('deadenemy', {
      loop:false
    }) 
    deadenemy.play();
    enemies.disableBody(true, true);

    slained = slained +1;
    slain.setText(slained);

    healt = healthy - 20000;
    health.setText(healt);

    if (slained == 5){
      talkingchar.stop();
      deadenemy.stop();
      energies = 30;
      sta.stop();
      energy.setText(energies);

      slained = 0;
      slain.setText(slained);
      this.scene.start("playgame1");

    }
    
 
  }
}


function collideWithEnemy1(player, enemies1) {
  if (collideWithEnemy1) {
    deadenemy = this.sound.add('deadenemy', {
      loop:false
    }) 
    deadenemy.play();
    enemies1.disableBody(true, true);

    slained = slained +1;
    slain.setText(slained)
    healt = healthy - 20000;
    health.setText(healt);
    
    if (slained == 5){
      talkingchar.stop();
      sta.stop();

      deadenemy.stop();
      energies = 30;
      energy.setText(energies);

      slained = 0;
      slain.setText(slained);
      this.scene.start("playgame1");

    }
    
 
  }
}
function collideWithEnemy2(player, enemies2) {
  if (collideWithEnemy2) {
    deadenemy = this.sound.add('deadenemy', {
      loop:false
    }) 
    deadenemy.play();
    enemies2.disableBody(true, true);

    slained = slained +1;
    slain.setText(slained)
    healt = healthy - 20000;
    health.setText(healt);
    
    if (slained == 5){
      talkingchar.stop();
      deadenemy.stop();
      energies = 30;
      energy.setText(energies);
      sta.stop();

      slained = 0;
      slain.setText(slained);
      this.scene.start("playgame1");

    }
    
 
  }
}
function collideWithEnemy3(player, enemies3) {
  if (collideWithEnemy3) {
    deadenemy = this.sound.add('deadenemy', {
      loop:false
    }) 
    deadenemy.play();
    enemies3.disableBody(true, true);

    slained = slained +1;
    slain.setText(slained)
    healt = healthy - 20000;
    health.setText(healt);
    
    if (slained == 5){
      talkingchar.stop();
      deadenemy.stop();
      energies = 30;
      energy.setText(energies);
      sta.stop();

      slained = 0;
      slain.setText(slained);
      this.scene.start("playgame1");

    }
    
 
  }
}
function collideWithEnemy4(player, enemies4) {
  if (collideWithEnemy4) {
    deadenemy = this.sound.add('deadenemy', {
      loop:false
    }) 
    deadenemy.play();
    enemies4.disableBody(true, true);

    slained = slained +1;
    slain.setText(slained)
    healt = healthy - 20000;
    health.setText(healt);
    
    if (slained == 5){
      talkingchar.stop();
      deadenemy.stop();
      energies = 30;
      energy.setText(energies);
      sta.stop();

      slained = 0;
      slain.setText(slained);
      this.scene.start("playgame1");

    }
    
 
  }
}

function restart() {
  replenishedd.visible = true;
  replenishedd.setText("                 Restarted                   ");
}

function energyReducer() {
  energies = energies - 0.5;
   if(energies == 30){
    energy.setText(energies);
  }
  else if (energies == 29){
    energy.setText(energies);
  }
  else if (energies == 28){
    energy.setText(energies);
  }
  else if (energies == 27){
    energy.setText(energies);
  }
  else if (energies == 26){
    energy.setText(energies);
  } 
  else if(energies == 25){
    energy.setText(energies);
  }
  else if (energies == 24){
    energy.setText(energies);
  }
  else if (energies == 23){
    energy.setText(energies);
  }
  else if (energies == 22){
    energy.setText(energies);
  }
  else if (energies == 21){
    energy.setText(energies);
  } 
  if(energies == 20){
    energy.setText(energies);
  }
  else if (energies == 19){
    energy.setText(energies);
  }
  else if (energies == 18){
    energy.setText(energies);
  }
  else if (energies == 17){
    energy.setText(energies);
  }
  else if (energies == 16){
    energy.setText(energies);
  } 
  else if(energies == 15){
    energy.setText(energies);
  }
  else if (energies == 14){
    energy.setText(energies);
  }
  else if (energies == 13){
    energy.setText(energies);
  }
  else if (energies == 12){
    energy.setText(energies);
  }
  else if (energies == 11){
    energy.setText(energies);
  } 
  else if(energies == 10){
    energy.setText(energies);
  }
  else if (energies == 9){
    energy.setText(energies);
  }
  else if (energies == 8){
    energy.setText(energies);
  }
  else if (energies == 7){
    energy.setText(energies);
  }
  else if (energies == 6){
    energy.setText(energies);
  } 
  else if(energies == 5){
    energy.setText(energies);
  }
  else if (energies == 4){
    energy.setText(energies);
  }
  else if (energies == 3){
    energy.setText(energies);
  }
  else if (energies == 2){
    energy.setText(energies);
  }
  else if (energies == 1){
    energy.setText(energies);
  } 
  else if (energies == 0){

    energy.setText('0');
    player.body.enable = false;
    tired.visible = true;
    replenished.visible = false;
  }
}
function energyEmpty() {

  tired.visible = false;
  replenished.visible = true;

  player.body.enable = false;
  
  energies = 30;
  energy.setText(energies);
}

function minusHealth(){
  tired.visible = false;
  player.body.enable = true;
  replenished.visible = false;
  if (healthy == 100000){
    healthy = healthy - 1000;
    health.setText(healthy);
  }
  else if (healthy > 0){
    healthy = healthy - 1000;
    health.setText(healthy);
  }
 
  else if (healthy == 0){

    healthy = '';
    health.setText(healthy);
    died.visible = true;
    player.disableBody(true, false);
    sta.stop();
  }
}



function startGame() {
  
  introText.visible = false;
  slain.visible = true;
  health.visible = true;
  gameStarted = true;
  finishedGame = false;
}
function enemyCollidedLeft() {
  if(enemies){
    enemies.setVelocityX(100);
  }
}

function enemyCollidedRight() {
  if(enemies){
    enemies.setVelocityX(-100);
  }
}
function enemyCollidedLeft1() {
  if(enemies1){
    enemies1.setVelocityX(100);
  }
}

function enemyCollidedRight1() {
  if(enemies1){
    enemies1.setVelocityX(-100);
  }
}
function enemyCollidedLeft2() {
  if(enemies2){
    enemies2.setVelocityX(100);
  }
}

function enemyCollidedRight2() {
  if(enemies2){
    enemies2.setVelocityX(-100);
  }
}
function enemyCollidedLeft3() {
  if(enemies3){
    enemies3.setVelocityY(100);
  }
}

function enemyCollidedRight3() {
  if(enemies3){
    enemies3.setVelocityY(-100);
  }
}
function enemyCollidedLeft4() {
  if(enemies4){
    enemies4.setVelocityY(100);
  }
}

function enemyCollidedRight4() {
  if(enemies4){
    enemies4.setVelocityY(-100);
  }
}
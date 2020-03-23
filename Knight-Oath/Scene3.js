
var map1;
var playerr;
var boss;
var princess;
var wincollide;
var save;
var princesstalk;
var bossInstaKill;
var dash;
var talkingchar;
var bosslevel;
var bosstalk;
var bossattack;
var bossSensorCharr;
var charge;
var chair;
var tileLayer, tileLayer1;
var healthh;
var healthyy = 100000;
var escapecollide;
var slainn;
var slainedd = 0;

var energyy;
var energiess = 29;

var introTextt;
var gameStartedd;

var logouii;
var charuii;
var tiredd;
var replenishedd;
var diedd;

var suree;
var quitt;
var reallynoo;
var reallyyess;

class Scene3 extends Phaser.Scene {
  constructor() {
    super("playgame1");
  }
  preload() {
    this.load.tilemapTiledJSON('map1', 'assets/map/map1.json');
    // tiles in spritesheet 
    this.load.spritesheet('tiless', 'assets/images/castleinside.png', {frameWidth: 50, frameHeight: 50});

    this.load.image('charuii', 'assets/images/charui.png');
    this.load.image('logouii', 'assets/images/logoui.png');
    this.load.image('quitt', 'assets/images/quit.png');
    this.load.image('coin', 'assets/images/coinGold.png');
    this.load.image('pepememee', 'assets/images/yousure.png');
    this.load.image('chair', 'assets/images/chairr.png');
    this.load.image('wincollide', 'assets/character/wincollider.png');

    this.load.image('enemy', 'assets/images/flyer.png');
    this.load.image('swordbullet', 'assets/images/swordbullet.png');


    this.load.audio('talk', 'assets/audio/chartalk.mp3');
    this.load.audio('bosslevel', 'assets/audio/battlewinscene.wav');
    this.load.audio('bosstalk', 'assets/audio/kingdead.mp3');
    this.load.audio('saveme', 'assets/audio/saveme.mp3');
    this.load.audio('princesstalk', 'assets/audio/princesstalk.mp3');
    this.load.audio('dash', 'assets/audio/dash.mp3');
    this.load.audio('chargee', 'assets/audio/charge.mp3');


    // player animations
    this.load.spritesheet(
      "playerr",
      "assets/character/char.png",
      {
        frameWidth: 27.9,
        frameHeight: 48
      }
    );
    this.load.spritesheet(
      "boss",
      "assets/character/boss.png",
      {
        frameWidth:  27,
        frameHeight: 48
      }
    );
    this.load.spritesheet(
      "chargee",
      "assets/character/charge.png",
      {
        frameWidth: 55,
        frameHeight: 48
      }
    );
    this.load.spritesheet(
      "princess",
      "assets/character/princess.png",
      {
        frameWidth: 27.9,
        frameHeight: 52
      }
    );
 

  }

  create() {
    map1 = this.make.tilemap({key: 'map1'});

    var tileTile = map1.addTilesetImage('tiled','tiless');
    tileLayer = map1.createDynamicLayer('Tiles', tileTile, 0, 0);

    var tileTile1 = map1.addTilesetImage('tiled','tiless');
    tileLayer1 = map1.createDynamicLayer('Tilescollider', tileTile1, 0, 0);

    chair = this.physics.add.image(700, 380, "chair");
    boss = this.physics.add.sprite(703, 380, "boss");

    princess = this.physics.add.sprite(760, 380, "princess");
    wincollide = this.physics.add.image(760, 1390, "wincollide");

    bossSensorCharr = this.physics.add.image(700, 700, "enemy");
    bossInstaKill = this.physics.add.image(703, 420, "swordbullet");

    playerr = this.physics.add.sprite(700, 1300, "playerr");

    escapecollide = this.physics.add.image(740, 2000, "wincollide");

    bosslevel = this.sound.add('bosslevel', {
      loop:true
    }) 
    bosslevel.play();
    sta.stop();

    talkingchar = this.sound.add('talk', {
      loop:false
    }) 
    talkingchar.play();

    boss.setCollideWorldBounds(true);
    playerr.setCollideWorldBounds(true);
    bossInstaKill.setCollideWorldBounds(true);

    princess.setCollideWorldBounds(true);
    princess.setImmovable();
    wincollide.setCollideWorldBounds(true);
    wincollide.setImmovable();
    escapecollide.setCollideWorldBounds(true);
    escapecollide.setImmovable();
    bossSensorCharr.setCollideWorldBounds(true);
    bossSensorCharr.setImmovable();
    tileLayer1.setCollisionByExclusion([-1]);

    this.physics.world.bounds.width = tileLayer1.width;
    this.physics.world.bounds.height = tileLayer1.height;
    
    this.physics.add.collider(tileLayer1, playerr);
    this.physics.add.collider(tileLayer1, boss);
    this.physics.add.collider(tileLayer1, bossInstaKill);

    this.physics.add.collider(playerr, boss);
    this.physics.add.collider(playerr, princess);
    this.physics.add.collider(princess, wincollide);
    this.physics.add.collider(bossInstaKill, escapecollide);

    this.physics.add.collider(playerr, bossSensorCharr);
    this.physics.add.collider(bossInstaKill, playerr);
    this.physics.add.collider(bossInstaKill, boss);

    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers("playerr", { start: 3, end: 5 }),
      frameRate: 10,
      repeat: -1
    });
    this.anims.create({
      key: "down",
      frames: this.anims.generateFrameNumbers("playerr", { start: 0, end: 2 }),
      frameRate: 10,
      repeat: -1
    });
    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers("playerr", { start: 6, end: 8 }),
      frameRate: 10,
      repeat: -1
    });
    this.anims.create({
      key: "up",
      frames: this.anims.generateFrameNumbers("playerr", { start: 9, end: 11 }),
      frameRate: 10,
      repeat: -1
    });
    //enemy
    this.anims.create({
      key: "bossleft",
      frames: this.anims.generateFrameNumbers("boss", { start: 3, end: 5 }),
      frameRate: 10,
      repeat: -1
    });
    this.anims.create({
      key: "bossdown",
      frames: this.anims.generateFrameNumbers("boss", { start: 0, end: 2 }),
      frameRate: 10,
      repeat: -1
    });
    this.anims.create({
      key: "bossright",
      frames: this.anims.generateFrameNumbers("boss", { start: 6, end: 8 }),
      frameRate: 10,
      repeat: -1
    });
    this.anims.create({
      key: "bossup",
      frames: this.anims.generateFrameNumbers("boss", { start: 9, end: 11}),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: "idle",
      frames: this.anims.generateFrameNumbers("playerr", { start: 1, end: 1 }),
    });
    this.anims.create({
      key: "bossidle",
      frames: this.anims.generateFrameNumbers("boss", { start: 1, end: 1 }),
    });
    //charging
    this.anims.create({
      key: "chargeleft",
      frames: this.anims.generateFrameNumbers("chargee", { start: 1, end: 1 }),
      
     
    });
    this.anims.create({
      key: "chargedown",
      frames: this.anims.generateFrameNumbers("chargee", { start: 0, end: 0 }),
  
    });
    this.anims.create({
      key: "chargeright",
      frames: this.anims.generateFrameNumbers("chargee", { start: 2, end: 2 }),

    });
    this.anims.create({
      key: "chargeup",
      frames: this.anims.generateFrameNumbers("chargee", { start: 3, end: 3 }),

    });
    //princess
    this.anims.create({
      key: "princess",
      frames: this.anims.generateFrameNumbers("princess", { start: 0, end: 5 }),
      
     
    });
    this.keyWW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.keySS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.keyAA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.keyDD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.keyTT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.T);
    this.keyPP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);

    this.keyEnterr = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    this.keyShiftt = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);
    this.keySpacee = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    this.physics.add.overlap(playerr, boss, collideWithBoss, null, this);
    this.physics.add.overlap(playerr, princess, collideWithPrincess, null, this);
    
    this.physics.add.overlap(wincollide, princess, winCollide, null, this);
    this.physics.add.overlap(escapecollide, bossInstaKill, escapeBoss, null, this);

    this.physics.add.overlap(playerr, bossSensorCharr, collideActivate, null, this);
    this.physics.add.overlap(bossInstaKill, playerr, died, null, this);

    this.cameras.main.setBounds(0, 0, map1.widthInPixels, map1.heightInPixels);
    // // make the camera fol low the player
    this.cameras.main.startFollow(playerr);


    var stylee = { font: "15px Arial", fill: "#ff0044", align: "center", backgroundColor:"black"};

    introTextt = this.add.text(
      600,
      580,
  
      "I sense the Dark king his near \nI need to rescue the princess!!!.",
          stylee)
    

    this.input.on("pointerdown", function() {
      if (!gameStartedd) {

        startGame();
      }
    });
    charuii = this.add.image(400, 290, 'charuii');
    logouii = this.add.image(720, 65, 'logouii');
    healthh = this.add.text(180, 90, healthy, {
      fontSize: '20px',
      fill: 'green',
      backgroundColor: 'green'
  });
  bossattack = this.add.text(250, 150, "", {
    fontSize: '40px',
    fontStyle: "bold",
    fill: '#FF0000',
    backgroundColor: "black"
    
  });
  slainn = this.add.text(220, 58, slained, {
    fontSize: '20px',
    fill: '#FF0000',
    
  });
  energyy = this.add.text(45, 150, energies, {
    fontSize: '20px',
    fill: '#add8e6',
    
  });
  tiredd = this.add.text(375, 150, '         Your Knight is Tired \n      press T to replenish energy \nbut remember it will affect your health', {
    fontSize: '30px',
    fill: 'red',
    backgroundColor: 'black'
    
  });
  replenishedd = this.add.text(340, 150, 'Energy Replenished! press ENTER to continue!', {
    fontSize: '30px',
    fill: 'red',
    backgroundColor: 'black'
    
  });
  diedd = this.add.text(400, 150, 'Knight died press "P" \n         to restart Level.', {
    fontSize: '40px',
    fill: 'red',
    backgroundColor: 'black'
    
  });
  const quitt = this.add.image(1350, 50, 'quitt');
    quitt.setInteractive();
    suree = quitt.on('pointerdown', () => { 
        this.add.image(720, 330, 'pepememee');

        this.add.text(650, 400, 'You sure Knight?', { fill: '#ffb6c1' });
        const reallyyess = this.add.text(680, 430, 'YES!', { fill: '#ffb6c1' });
        reallyyess.setInteractive();
        reallyyess.on('pointerdown', () => { 
        this.scene.start("startmenu");
        });
        const reallynoo = this.add.text(750, 430, 'NO!', { fill: '#ffb6c1' });
        reallynoo.setInteractive();
        reallynoo.on('pointerdown', () => { 
    
            this.scene.start("playGame1");
        });
    });
     // fix the text to the camera
    replenishedd.setScrollFactor(0);
    tiredd.setScrollFactor(0);
    slainn.setScrollFactor(0);
    healthh.setScrollFactor(0);
    energyy.setScrollFactor(0);
    diedd.setScrollFactor(0);
    bossattack.setScrollFactor(0);
    introTextt.setScrollFactor(0);
    charuii.setScrollFactor(0);
    logouii.setScrollFactor(0);
    suree.setScrollFactor(0);
    quitt.setScrollFactor(0);
    diedd.visible = false;
    tiredd.visible = false;
    replenishedd.visible = false;
    healthh.visible = true;

  
  }
  update(time, delta) {
  
    princess.anims.play('princess', true);
    boss.anims.play('bossdown', true);

    playerr.setVelocity(0, 0);
   
    //wasd
    if (this.keyWW.isDown) {
      //health.setText(healthy - 10000)
      playerr.body.setVelocityY(-100);
      playerr.anims.play('up', true);
      startGamee();
      if (this.keySpacee.isDown) {
        energyReducerr();
        dash = this.sound.add('dash', {
          loop:false
        }) 
        dash.play();
        playerr.body.setVelocityY(-400);
        playerr.anims.play('chargeup', true);
        startGamee();
      } else if (this.keyShiftt.isDown) {
        playerr.body.setVelocityY(-250);
        playerr.anims.play('up', true);
        startGamee();
      } 

    }
    else if (this.keySS.isDown) {
      
      playerr.body.setVelocityY(100);
      playerr.anims.play('down', true);
      startGamee();
      if (this.keySpacee.isDown) {
        energyReducerr();
        dash = this.sound.add('dash', {
          loop:false
        }) 
        dash.play();
        playerr.body.setVelocityY(400);
        playerr.anims.play('chargedown', true);
        startGamee();
      } else if (this.keyShiftt.isDown) {
        playerr.body.setVelocityY(250);
        playerr.anims.play('down', true);
        startGamee();
      } 

    }
    else if (this.keyAA.isDown) {
      
      playerr.body.setVelocityX(-100);
      playerr.anims.play('left', true); 
      startGamee();
      if (this.keySpacee.isDown) {
        energyReducerr();
        dash = this.sound.add('dash', {
          loop:false
        }) 
        dash.play();
        playerr.body.setVelocityX(-400);
        playerr.anims.play('chargeleft', true);
        startGamee();
      } else if (this.keyShiftt.isDown) {
        playerr.body.setVelocityX(-250);
        playerr.anims.play('left', true);
        startGamee();
      } 
     

    }
    else if (this.keyDD.isDown) {
      
      playerr.body.setVelocityX(100);
      playerr.anims.play('right', true);
        startGamee();
        if (this.keySpacee.isDown) {
          dash = this.sound.add('dash', {
            loop:false
          }) 
          dash.play();
          energyReducerr();
          playerr.anims.play('chargeright', true);
          playerr.body.setVelocityX(400);
          startGamee();
        }else if (this.keyShiftt.isDown) {
          playerr.body.setVelocityX(250);
          playerr.anims.play('right', true);
          startGamee();
        } 
        
    } 
    else if (this.keyTT.isDown) {
      energyEmptyy(); 
      
    }  else if (this.keyPP.isDown) {

      this.scene.start("playgame1"); 
      restart();
    }else  if (this.keyEnterr.isDown) {
      minusHealthh(); 
    }
    else{
      playerr.body.setVelocityX(0);

      playerr.anims.play('idle', true);
    }
  }
  
 
}
function collideWithBoss(playerr, boss) {
  if (collideWithBoss) {
    bosstalk = this.sound.add('bosstalk', {
      loop:false
    }) 
    bosstalk.play();
    boss.disableBody(true, true);
    bossInstaKill.disableBody(true, true);

    slainedd = slainedd + 1;
    slainn.setText(slainedd)
    replenishedd.visible = true;
    replenishedd.setText("You Kill the Demon King get the Princess!")

    charuii.visible = false;
    logouii.visible = false;
    energyy.visible = false;
    slainn.visible = false;
    healthh.visible = false;
    bossattack.visible = true;

    sleyn = 0;
    slainn.setText(sleyn);
    if (slainedd == 1){
      save.stop();
      talkingchar.stop();
      bosslevel.stop();
      slainn.setText("");
      healthyy = "";
      healthh.setText(healthyy);
      healthh.visible = false;
      bossattack.visible = false;

    }
 
  }
}
function collideWithPrincess() {
  if (collideWithPrincess) {
    replenishedd.visible = true;
    replenishedd.setText("The Demon King is still here!")

    
    if (slainedd == 1){
      princesstalk = this.sound.add('princesstalk', {
        loop:false
      }) 
      
      princesstalk.play();
      replenishedd.visible = true;
      replenishedd.setText("Thank you my knight now lets return \nto my kingdom follow me!")
      princess.setVelocityY(150);

    }
    
 
  }
}
function collideActivate() {
  if (collideActivate) {
    save = this.sound.add('saveme', {
      loop:false
    }) 
    
    charge = this.sound.add('chargee', {
      loop:false
    }) 
    charge.play();
    bossattack.setText("Forbidden Jutsu: Ghost Sword Charge!!!")
    save.play();
    bossattack.visible = true;
    bossSensorCharr.disableBody(true,true);
    boss.body.setVelocityY(450);
  }
}
function restart() {
  replenishedd.visible = true;
  replenishedd.setText("                 Restarted                   ");
  healthyy = 0;
  healthh.setText(healthyy);
  healthh.visible = false;
  slainedd = 0;
  slainn.setText(sleyn);
  slainn.visible = false;
  save.stop();
  talkingchar.stop();
  bosslevel.stop();
  princesstalk.stop();
  this.scene.start("playgame1");
}

function winCollide() {
  healthyy = 0;
  healthh.setText(healthyy);
  healthh.visible = false;
  slainedd = 0;
  slainn.setText(sleyn);
  slainn.visible = false;
  save.stop();
  talkingchar.stop();
  bosslevel.stop();
  princesstalk.stop();
  this.scene.start("winscene");
}


function energyReducerr() {

  energiess = energiess - 0.5;
   if(energiess == 30){
    energyy.setText(energiess);
  }
  else if (energiess == 29){
    energyy.setText(energiess);
  }
  else if (energiess == 28){
    energyy.setText(energiess);
  }
  else if (energiess == 27){
    energyy.setText(energiess);
  }
  else if (energiess == 26){
    energyy.setText(energiess);
  } 
  else if(energiess == 25){
    energyy.setText(energiess);
  }
  else if (energiess == 24){
    energyy.setText(energiess);
  }
  else if (energiess == 23){
    energyy.setText(energiess);
  }
  else if (energiess == 22){
    energyy.setText(energiess);
  }
  else if (energiess == 21){
    energyy.setText(energiess);
  } 
  if(energiess == 20){
    energyy.setText(energiess);
  }
  else if (energiess == 19){
    energyy.setText(energiess);
  }
  else if (energiess == 18){
    energyy.setText(energiess);
  }
  else if (energiess == 17){
    energyy.setText(energiess);
  }
  else if (energiess == 16){
    energyy.setText(energiess);
  } 
  else if(energiess == 15){
    energyy.setText(energiess);
  }
  else if (energiess == 14){
    energyy.setText(energiess);
  }
  else if (energiess == 13){
    energyy.setText(energiess);
  }
  else if (energiess == 12){
    energyy.setText(energiess);
  }
  else if (energiess == 11){
    energyy.setText(energiess);
  } 
  else if(energiess == 10){
    energyy.setText(energiess);
  }
  else if (energiess == 9){
    energyy.setText(energiess);
  }
  else if (energiess == 8){
    energyy.setText(energiess);
  }
  else if (energiess == 7){
    energyy.setText(energiess);
  }
  else if (energiess == 6){
    energyy.setText(energiess);
  } 
  else if(energiess == 5){
    energyy.setText(energiess);
  }
  else if (energiess == 4){
    energyy.setText(energiess);
  }
  else if (energiess == 3){
    energyy.setText(energiess);
  }
  else if (energiess == 2){
    energyy.setText(energiess);
  }
  else if (energiess == 1){
    energyy.setText(energiess);
  } 
  else if (energiess == 0){

    energyy.setText('0');
    playerr.body.enable = false;
    tiredd.visible = true;
    replenishedd.visible = false;

  }
}
function energyEmptyy() {

  tiredd.visible = false;
  replenishedd.visible = true;
  bossattack.visible = false;
  playerr.body.enable = false;
  
  energiess = 30;
  energyy.setText(energies);
}

function minusHealthh(){
  tiredd.visible = false;
  playerr.body.enable = true;
  replenishedd.visible = false;
  
  if (healthyy == 100000){
    healthyy = healthyy - 10000;
    healthh.setText(healthyy);

  }else if (healthyy > 90000){
    healthyy = healthyy - 10000;
    healthh.setText(healthyy);

  }
  else if (healthyy > 80000){
    healthyy = healthyy - 10000;
    healthh.setText(healthyy);

  }else if (healthyy > 70000){
    healthyy = healthyy - 10000;
    healthh.setText(healthyy);

  }else if (healthyy > 60000){
    healthyy = healthyy - 10000;
    healthh.setText(healthyy);

  }
  else if (healthyy > 50000){
    healthyy = healthyy - 10000;
    healthh.setText(healthyy);

  }else if (healthyy > 40000){
    healthyy = healthyy - 10000;
    healthh.setText(healthyy);

  }else if (healthyy > 30000){
    healthyy = healthyy - 10000;
    healthh.setText(healthyy);

  }
  else if (healthyy > 20000){
    healthyy = healthyy - 10000;
    healthh.setText(healthyy);

  }else if (healthyy > 10000){
    healthyy = healthyy - 10000;
    healthh.setText(healthyy);

  }
 
  else if (healthyy == 0){
    healthyy = '';
    healthh.setText(healthyy);
    healthh.visible = false;
    slainn.visible = false;
    diedd.visible = true;
    playerr.disableBody(true, false);
    bosslevel.stop();
    bossattack.visible = false;

  }
}

function bossSensorChar() {
  boss.setVelocityY(100);
}

function startGamee() {
  introTextt.visible = false;
  slainn.visible = true;
  healthh.visible = true;
  gameStartedd = true;
  healthyy = 100000;
  healthh.setText(healthyy);
}

function died() {
  healthyy = '';
  diedd.setText("Knight died in King Charge Attack! press P to restart!");
  healthh.visible = false;
  slainn.visible = false;
  diedd.visible = true;
  playerr.disableBody(true, false);
  boss.disableBody(true, false);
  bossInstaKill.disableBody(true, false);
  bossattack.visible = false;
  bosslevel.stop();
}
function escapeBoss() {
  healthyy = '';
  diedd.setText("   King Escaped! and the   \nenemy forces surrounds you!\n    press P ro restart   ");
  healthh.visible = false;
  slainn.visible = false;
  diedd.visible = true;
  playerr.disableBody(true, false);
  boss.disableBody(true, false);
  bossInstaKill.disableBody(true, false);
  bossattack.visible = false;
  bosslevel.stop();
}
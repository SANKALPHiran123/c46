var backImage,backgr;
var player, player_running;
var ground,ground_img;

var MoneyGroup, coinImage;
var manholeGroup, manhole_img;

var gameOver;
var gameover,gameover_img
var score=0;
var life=3;

function preload(){
  backImage=loadImage("city.png");
 // player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
 // gameover= loadImage("gameOver.png");

  coinImage = loadImage("cash.png");
  manhole_img = loadImage("stone.png"); 
  
}

function setup() {
  createCanvas(800,400);
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=0.7;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  player = createSprite(100,340,20,50);
//player.addAnimation("Running",player_running);
  //player.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  ground.visible=false;
  
  MoneyGroup = new Group();
  manholeGroup = new Group();
  life = 3
  score = 0;
}

function draw() {
  
  background(255);
  
    
  if(ground.x<0) {
    ground.x=ground.width/2;
  }
  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }
  
    if(MoneyGroup.isTouching(player)){
      MoneyGroup.destroyEach();
    score = score + 2;
    }
    switch(score){
        case 10: player.scale=0.12;
                break;
        case 20: player.scale=0.14;
                break;
        case 30: player.scale=0.16;
                break;
        case 40: player.scale=0.18;
                break;
        default: break;
    }
  
    if(keyDown("space") ) {
      player.velocityY = -12;
    }
    player.velocityY = player.velocityY + 0.8;
  
    player.collide(ground);
    spawnMoney();
    spawnManhole();
 
    if(manholeGroup.isTouching(player)){ 
        player.scale=0.08;
        life-=1;
    }

    if(life===0 || life<0){
      var gameover = createSprite(300,300,1200,600)
     gameover.shapeColor = "black"
     ground.velocity=0
     MoneyGroup.destroyEach()
     manholeGroup.destroyEach()
    // gameover.addImage("gameover",gameover_img)
      
    }
  
  drawSprites();
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score, 500,50);
  text("Lives left: "+ life, 300,50);
}

function spawnMoney() {
  //write code here to spawn the food
  if (frameCount % 80 === 0) {
    var money = createSprite(600,250,40,10);
    money.y = random(120,200);    
    money.addImage(coinImage);
    money.scale = 0.1;
    money.velocityX = -5;
     //assign lifetime to the variable
     money.lifetime = 300;
    player.depth = money.depth + 1;
    
    //add each banana to the group
    MoneyGroup.add(money);
  }
}

function spawnManhole() {
  if(frameCount % 300 === 0) {
    var manhole = createSprite(800,350,10,40);
    manhole.velocityX = -6;
    manhole.addImage(manhole_img);
    
    //assign scale and lifetime to the obstacle     
    manhole.scale = 0.2;
    manhole.lifetime = 300;
    
    //add each obstacle to the group
    manholeGroup.add(manhole);
  }
}


  

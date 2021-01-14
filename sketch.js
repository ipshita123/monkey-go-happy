var PLAY = 1;
var END  = 0;
var gameState = PLAY;
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var   bananaGroup, obstaclesGroup;
var score;
var survivalTime = 0;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600,600);

  stroke("white");
  textSize(20);
  fill("white");
  text("Score:"+score,500,50);
  
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime = Math.ceil(frameCount/frameRate())
  text("Survival Time:"+survivalTime,100,50);
  
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(400,350,900,10);
  ground.velocityX = -4;
  ground.x = ground.width/2;
  console.log(ground.x)
  
  bananaGroup = createGroup();
  obstaclesGroup = createGroup();
  
  score = 0;
}


function draw() {
background(200);
  
  if(gameState === PLAY){
    
    if(keyDown("space")&& monkey.y >= 100){
      monkey.velocityY = -12;
    }
    
    //add gravity
    monkey.velocityY = monkey.velocityY + 0.8
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
  }
  monkey.collide(ground);
  
  fruits();
  obstacles();
  
  drawSprites();
}

function fruits(){
  if(frameCount % 80 === 0 ){
    var banana = createSprite(600,120,40,10);
    banana.y = Math.round(random(120,200));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;
    banana.lifetime = 200;
    bananaGroup.add(banana);
  }
}

function obstacles(){
   if (frameCount % 300 === 0){
   var obstacle = createSprite(600,330,10,40);
   obstacle.velocityX = -(6 + score/100);
   obstacle.addImage(obstacleImage);
   
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.1;
    obstacle.lifetime = 300;
   
   //add each obstacle to the group
    obstaclesGroup.add(obstacle);
 }
}

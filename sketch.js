 var PLAY=1;

var END=0;

var monkey , monkey_running

var background,backgroundImg ,ground;

var banana ,bananaImage, bananaGroup;

var obstacle, obstacleImage, obstaclesGroup;

var FoodGroup;

var gameState=PLAY;

var score = 0;

function preload(){
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  backgroundImg=loadImage("images.jpg");
  
  bananaImage = loadImage("banana.png");
  
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
createCanvas(400, 400)

background=createSprite(200, 245, 400, 400);
background.addImage(backgroundImg);
background.scale=2.3;

ground=createSprite(200, 368, 600, 10);
ground.visible=false;
  
monkey = createSprite(50, 325);  
monkey.addAnimation("running",monkey_running);
monkey.scale=0.12;  

monkey.debug=true;  

 obstacleGroup = new Group();
 bananaGroup = new Group();
}


function draw() {

if(gameState === PLAY){
background.velocityX=-4;
if(background.x < 0)
   {
  background.x=background.width/2;
   }

  score=score + Math.round(getFrameRate()/60);
  
  if(keyDown("space") && monkey.y >= 315){
  monkey.velocityY=-12;   
}
spawnObstacles();
spawnBanana();  

  if(monkey.isTouching(bananaGroup)) {
 bananaGroup.destroyEach();
}
  
if(monkey.isTouching(obstacleGroup)) {
 gameState=END ;
}

monkey.velocityY=monkey.velocityY+0.5 ;
  
} else if(gameState===END){
          
 background.velocityX=0;         
 monkey.velocityX=0;         
 monkey.velocityY=0;         
obstacleGroup.setVelocityXEach(0);  
bananaGroup.setVelocityXEach(0);
obstacleGroup.setLifetimeEach(-1);
bananaGroup.setLifetimeEach(-1);
}

  monkey.collide(ground); 
drawSprites();  
text("Survival Time - " + score, 150, 100);
}
function spawnObstacles(){
var rand=Math.round(random(1,800));
  if(frameCount % rand===0)
   {
obstacle = createSprite(400, 335); 
obstacle.addImage(obstacleImage); 
obstacle.velocityX=-4 
obstacle.scale=0.12;
obstacle.setCollider("circle", 0, 0, 150);
//obstacle.debug=true;
obstacleGroup.add(obstacle);
  obstacle.lifetime=200;
   }
 }

function spawnBanana()
{
  var rand=Math.round(random(1,800));
  if(frameCount % rand===0)
   {
banana = createSprite(400, 255); 
banana.addImage(bananaImage); 
banana.velocityX=-4 
banana.scale=0.12;
banana.setCollider("circle", 0, 0, 150);
//obstacle.debug=true;
bananaGroup.add(banana);
  banana.lifetime=200;
   } 
}
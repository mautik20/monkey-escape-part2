var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score

 
function preload(){
   monkey_running =            loadAnimation("sprite_0.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
}

function setup() {
 // createCanvas(600, 200);
  
  //creating monkey
  monkey = createSprite(80,315,20,20);  
  monkey.addAnimation("moving", monkey_running);
    monkey.scale = 0.1;
  


  
  

  
  //creating obstacle
   ground = createSprite(400,350,900,10);
   ground.velocityX=-4
   
  survivalTime = 0;
  
  obstaclesGroup=new Group();
  bananasGroup=new Group();
}

function draw() {
  //monkey.debug = true;
  background(255);
   if(keyDown("space") && monkey.y >= 159) {
      monkey.velocityY = -12;
    }
      monkey.velocityY = monkey.velocityY+0.8 ;

    
 
  
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
   monkey.collide(ground);
    spawnbananas();
    spawnObstacles();
   
  drawSprites();
//   text("survivalTime: "+ survivalTime, 500,50);

 // if (gameState===PLAY){
     if(obstaclesGroup.isTouching(monkey)){
    //    "survivalTime: "+ survivalTime, 500,50;
    //}
  
   
  
   
  
   
  
//  else if (gameState === END) {
      
    //set velcity of each game object to 0
    ground.velocityX = 0;
    monkey.velocityY = 0;
      obstaclesGroup.setVelocityXEach(0);
    bananasGroup.setVelocityXEach(0);

       
       
       
    //change the monkey animation
  //  monkey.changeAnimation("monkey0", sprite_0);
    
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    bananasGroup.setLifetimeEach(-1);
    
    
  }
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score, 500,50); 
stroke("black");
  textSize(20);
  fill("black");
  survivalTime=Math.ceil(frameCount/frameRate()) 
  text("Survival Time: "+ survivalTime, 100,50);

}

function spawnbananas() {
  
  //write code here to spawn the bananas
  if (frameCount % 60 === 0) {
    var banana = createSprite(600,165,10,40);
    banana.y = random(120,200);
    banana.addImage(bananaImage);
    banana.scale = 0.05;
    banana.velocityX = -3;
    
     //assign lifetime to the variable
    banana.lifetime = 200;
    
    //adjust the depth
 //   banana.depth = monkey.depth;
    monkey.depth = banana.depth + 1;
    
    //add each banana to the group
    bananasGroup.add(banana);
  }
  
}

function spawnObstacles() {
  if(frameCount % 300 === 0) {
    var obstacle = createSprite(800,320,10,40);
    //obstacle.debug = true;
    obstacle.velocityX = -6;
    
    //generate random obstacles
 
    obstacle.addImage(obstaceImage);
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.15;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}


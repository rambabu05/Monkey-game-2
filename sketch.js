
var obstacle, obstacleImage;
var banana, bananaImage;
var monkey, monkey_running, ground, invisibleGround;
var foodGroup, obstaclesGroup;
var score=0;
var gameState = "Play";


function preload(){
  
monkey_running =loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");   
 
obstacleImage = loadImage("obstacle.png");
  
bananaImage = loadImage("banana.png");
  
}


function setup() {
  
 createCanvas(600, 400);
 background(rgb(204, 255, 255)); 
 
 monkey=createSprite(80, 280, 10, 40);
 monkey.addAnimation("monkey",monkey_running);
 monkey.scale=0.25; 

 ground=createSprite(250, 350, 1200, 10);
 
 invisibleGround=createSprite(250, 354, 1200, 10);
 invisibleGround.visible=false;

   //creating new groups
 foodGroup=new Group();
 obstaclesGroup=new Group();
}


function draw() { 
  
  background(rgb(203, 255, 255));
  
  
  if (gameState =="Play")
    {

       //setting the ground velocity
      ground.velocityX=-6;

      //reseting the ground
      if(ground.x<0)
      {
        ground.x=ground.width/2;
      }

      //calling the functions
      if(frameCount%80===0)
      {
        bananaF();  
      }

      if(frameCount%300===0)
      {
          obstacles();
      }

      background(rgb(204, 255, 255));

      //making the monkey jump
      if (keyDown("space") && monkey.y>=272)
      {   
        monkey.velocityY=-30;
      }
      //gravity
       monkey.velocityY=monkey.velocityY+2;
       console.log(monkey.y)

      //preventing the monkey from falling
      monkey.collide(invisibleGround);

      //scoring system
      score=score+Math.round(getFrameRate()/60);

       textSize(20);
       fill("purple");
       text("Survival Time:"+score, 430, 40);
    }
  
  drawSprites();

  //if statement
  if(obstaclesGroup.collide(monkey))
    {
      foodGroup.destroyEach();
      obstaclesGroup.destroyEach();
      ground.velocityX=0;
      gameState ="End";
    }
  
  if (gameState=="End")
    {
      textSize(30);
      fill("red");
      text("Game over", 250, 200);
     
       textSize(20);
       fill("purple");
       text("Survival Time:"+score, 430, 40);
      
      monkey.collide(invisibleGround);
    }
}

function bananaF()

{
  //function for the banana
     banana =createSprite(610, Math.round(random(120, 200)), 20, 10);  
     banana.addImage("banana", bananaImage);
     banana.scale=0.15;
     banana.velocityX=-5;
     banana.lifetime=120;
  
     foodGroup.add(banana); 
}

function obstacles()
{

    obstacle=createSprite(610, 300, 40, 40);
  obstacle.addImage("stone", obstacleImage)
  obstacle.scale=0.25;
  obstacle.velocityX=-8; 
  obstacle.lifetime=75;
      
   obstaclesGroup.add(obstacle);
    
}








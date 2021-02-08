

var edges
var bird,pipe2,pipe1,pipes,yPipe
var PLAY=1
var BUTTON =2
var END =0
var gameState = BUTTON
var score
var highscore =0
var points 
var i = 0
function preload(){
  bg = loadImage("flappy bird.png");
  birdI = loadImage("bird2.png");
  pillarI = loadImage("pillars.png");

}

function setup() {
  createCanvas(600,900);

  pipes = createGroup();

  bird =createSprite(50,300,30,30)
  bird.shapeColor="lightGreen";
  bird.addImage(birdI);
  bird.scale = 0.2;
  bird.rotation = 50;

  yPipe =300

  score = 0
  points = 0
}

function draw() {
  background(bg)
  //edges
  edges = createEdgeSprites();
  
  
  //
  //gamestate
  if (gameState===PLAY){
    edges.visible = false;  
    camera.position.y = (bird.y);
    score = score+1
    if (score % 60 === 0&& score >160){
      points = points +1
    }
    if (keyWentDown("space")){
      bird.velocityY =-10
    }
    createPipes();
    if(bird.velocityY < 0){
       bird.rotation =80
    }else{
      bird.rotation=100
    }
    if(bird.isTouching(edges)){
       gameState = END
    }
    bird.velocityY =bird.velocityY +1
  }else if(gameState ===END){
    pipes.setLifetimeEach (65)
    bird.rotation=120
    bird.velocityY =bird.velocityY +2
    pipes.setVelocityXEach(0)
  }else if(gameState ===BUTTON){
    bird.velocityY=0
  }
  bird.collide(edges)
  //
  

  
  if(bird.isTouching(pipes)){
   gameState =END
    
  }
  drawSprites()
  fill("black")
  if(gameState ===END){
    fill("white")
    text("press space to retry",250,300)
    if (keyDown("space")){
      bird.destroy()
      pipes.destroyEach()

      setup();
      gameState = PLAY
    }
  }else if(gameState ===BUTTON){
    fill("white");
    textSize(20);
    text("press space to start",250,300)
    if (keyDown("space")){
      bird.destroy()
      pipes.destroyEach()

      setup();
      gameState = PLAY
    }
  }
  fill("white")
  textSize(15)
  text("Points: "+points,50,bird.y-100)
  //text("score: "+score,500,70)
  text("Highscore: "+highscore,500,bird.y-100)
  if(points> highscore){
    highscore = points
  }
}
function createPipes(){
  i =score -10
  if (i % 60 ===0&&i>25){
    yPipe =Math.round(random(150,450));
    pipe1=createSprite(600,yPipe-400,50,600);
    pipe2=createSprite(600,yPipe+400,50,600);
    pipe1.addImage(pillarI);
    pipe2.addImage(pillarI);
    pipe1.setCollider("rectangle",0,0,250,1500);
    pipe2.setCollider("rectangle",0,0,250,1500);
    // pipe1.debug = true;
    // pipe2.debug = true;
    pipe1.scale = 0.4;
    pipe2.scale = 0.4;
    pipes.setLifetimeEach (65);
    pipes.add(pipe1);
    pipes.add(pipe2);
    pipes.setColorEach("green");
    pipes.setVelocityXEach(-5);
  
  }
}

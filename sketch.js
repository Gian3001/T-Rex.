var dino, dinoImg;
var ground, groundImg;
var invisibleground;
var cloud, cloudImg;
var obstacle, o1, o2, o3, o4, o5, o6;
var gamestate = 'play'; 
var obstaclegroup, cloudgroup; 
var score;
var dinocollide;
var go, goimg;
var dieSound, jumpSound, checkSound;

function preload(){
  //loading image files
  
  //dino image loading
  dinoImg = loadAnimation('trex1.png', 'trex3.png', 'trex4.png');
  dinocollide = loadAnimation('trex_collided.png');
  
  //ground image loading
  groundImg = loadAnimation('ground2.png');
  
  //cloud image loading
  cloudImg = loadAnimation('cloud.png');
  
  //creating 'game over'
  goimg = loadAnimation('gameOver.png');  
  //Obstacle loading
  o1 = loadImage('obstacle1.png');
  o2 = loadImage('obstacle2.png')
  o3 = loadImage('obstacle3.png')
  o4 = loadImage('obstacle4.png')
  o5 = loadImage('obstacle5.png')
  o6 = loadImage('obstacle6.png')

  dieSound = loadSound('die.mp3');
  jumpSound = loadSound('jump.mp3');
  checkSound = loadSound('checkPoint-1.mp3');
}

function setup(){
  createCanvas(600,400);
  
  //creating trex
  dino = createSprite(50,300, 20, 20);
  dino.addAnimation('walk', dinoImg);
  dino.addAnimation('hit', dinocollide);
  dino.scale = 0.7
  
  dino.setCollider('rectangle', 0, 0, 100, 100)
  //dino.debug=true
  
  //creating ground
  ground =  createSprite(300,330,600,10);
  ground.addAnimation('move',groundImg);

  //creating invisibleground
  invisibleground = createSprite(300,340,600,10);
  invisibleground.visible = false;
  
  // creating go
  go = createSprite(300,100,10,10);
  go.addAnimation('display',goimg);
  
  
  obstaclegroup = createGroup();
  cloudgroup = createGroup();
}



function draw(){
  background('lightblue');
  
  //displaying score
  text('score: '+score,500,50);
  console.log('Hi!'+5);
 
  
  if(gamestate == 'play'){
    //dino jump
    //if(keyDown("space")){
    //if(dino.y > 250){
    if(keyDown("space") && dino.y >= 250) {
      dino.velocityY = -15; 
      jumpSound.play();
    } 
    //gravity
    dino.velocityY = dino.velocityY + 1;
    //creating infinite screen
    ground.velocityX = -5;
    //resetting ground
    if(ground.x < 0){
      ground.x = 300;
    }
    //calling clouds and obstacles
    createClouds();
    createObstacles();
    //ending the game
    if(dino.isTouching(obstaclegroup)){
      gamestate = 'end';
      dieSound.play();
    }
    score = score + Math.round(frameCount/50);
  }
  
  if(gamestate == 'end'){
    ground.velocityX = 0;
    obstaclegroup.setVelocityXEach(0);
    cloudgroup.setVelocityXEach(0);
    obstaclegroup.setLifetimeEach(-10);
    cloudgroup.setLifetimeEach(-10);
    dino.changeAnimation('hit',dinocollide)
    go.visible = true;
    dino.velocityY = 0;
  }
  
  console.log(frameCount);
  
  
  //making dino standby
  dino.collide(invisibleground);
  
  
  
  
  drawSprites();
}

//creating clouds
function createClouds(){
  if (frameCount% 60 == 0){
    cloud = createSprite(650,50,10,10);
    cloud.addAnimation('move',cloudImg);
    cloud.velocityX = -6;  
    
    //Making cloud height random
    var r = Math.round(random(10,250))
    cloud.y = r
    
    //Adjust depth
    cloud.depth = dino.depth;
    dino.depth = dino.depth+1;
    
    //Memory Leakage
    cloud.lifetime = 100;
    cloudgroup.add(cloud);
    
  } 
}


function createObstacles(){
  if (frameCount% 100 == 0){
    obstacle = createSprite(650,320, 20, 20);
    obstacle.velocityX = -6;
    
    //Adding animation to obstacle randomly
    var rand = Math.round(random(1,6))
    switch(rand){
        case 1: obstacle.addImage('move', o1)
                break;
        case 2: obstacle.addImage('move', o5)
                break;
        case 3: obstacle.addImage('move', o3)
                break;
        case 4: obstacle.addImage('move', o2)
                break;
        case 5: obstacle.addImage('move', o6)
                break;
        case 6: obstacle.addImage('move', o4)
                break;
    }

    //scaling obstacles
    obstacle.scale = 0.6
    //Memory Leakage
    obstaclegroup.add(obstacle);
    
  }
  
}
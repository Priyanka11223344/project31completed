var Engine = Matter.Engine,
  World = Matter.World,
  Events = Matter.Events,
  Bodies = Matter.Bodies;
 
var particles = [];
var plinkos = [];
var divisions =[];
var divisionHeight=300;
var score =0;
var ball;
var gamestate = "START";
var Count=0;
var balls=[];

function setup() {
  createCanvas(800, 800);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(width/2,height,width,20);

  //create division objects
  for (var k = 0; k <=800; k = k + 70) {
    divisions.push(new Divisions(k, height-divisionHeight/2, 10, divisionHeight));
  }

  //create 1st row of plinko objects
  for (var j = 75; j <=width; j=j+50) { 
    plinkos.push(new Plinko(j,75));
  }

  //create 2nd row of plinko objects
  for (var j = 50; j <=width-10; j=j+50) 
  {
    plinkos.push(new Plinko(j,175));
  }

  //create 3rd row of plinko objects
  for (var j = 50; j <=width-10; j=j+60) 
  {
    plinkos.push(new Plinko(j,280));
  }
  
  //create 4th row of plinko objects
  for (var j = 50; j <=width-10; j=j+70) 
  {
    plinkos.push(new Plinko(j,400));
  }

  //create particle objects
 
}
 


function draw() {
  background("black");
  textSize(35) 
  text("Score : "+score,20,40); 
  fill("white"); 

  //text(mouseX + "," + mouseY, 20, 50);
   textSize(35) 
   //displays the scores for the divisions text(" 500 ", 5, 550);
    text(" 500 ", 80, 550);
    text(" 500 ", 160, 550);
    text(" 500 ", 240, 550);
    text(" 100 ", 320, 550); 
    text(" 100 ", 400, 550);
    text(" 100 ", 480, 550);
    text(" 200 ", 560, 550); 
    text(" 200 ", 640, 550);
    text(" 200 ", 720, 550);
 
  Engine.update(engine);
  ground.display();

  if(gamestate==="END"){
    text("Game Over",150,250);
  }
  
  if(frameCount%60===0){
    particles.push(new Partical(random(width/2-10,width/2+10),10,10));
   }
  //display the plinkos 
  for (var i = 0; i < plinkos.length; i++) {
    plinkos[i].display();   
  }
   
  //display the divisions
  for (var k = 0; k < divisions.length; k++) {
    divisions[k].display();
  }

  //display the paricles 
  for (var i = 0; i < particles.length; i++) {
    particles[i].display();   
  }
   
  if(ball!=null){
    ball.display();
    if(ball.body.position.y > 760){
    if(ball.body.position.x < 300)  {
    score = score +500;
    ball = null;
    if(Count >= 5){
      gamestate = "END";
    }
    }
    else if (ball.body.position.x < 600 && ball.body.position.x > 301){
      score = score +100;
    ball = null;
    if(Count >= 5){
      gamestate = "END";
    }
    } 
    else if (ball.body.position.x < 900 && ball.body.position.x > 601){
      score = score +200;
    ball = null;
    if(Count >= 5){
      gamestate = "END";
    }
    } 
    }
  }
}

function mousePressed(){
  if(gamestate!= "END"){
    Count++
    ball = new Partical(mouseX,10,10,10);
  }
}
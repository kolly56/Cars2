var canvas, backgroundImage;

var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;
var database;
var finish;
var finishedPlayers;

var form, player, game;

var cars, car1, car2, car3, car4;
function preload(){
bg=loadImage("images/track.jpg");
c1=loadImage("images/car1.png");
c2=loadImage("images/car2.png");
c3=loadImage("images/car3.png");
c4=loadImage("images/car4.png");
gr=loadImage("images/ground.png");
gl=loadImage("images/gold.png");
sl=loadImage("images/silver.png");
br=loadImage("images/bronze.png");
}

function setup(){
  canvas = createCanvas(displayWidth - 20, displayHeight-30);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
}


function draw(){
  background("#73EEF5");
  if(playerCount === 4&&finishedPlayers===0){
    game.update(1);
  }
  if(gameState === 1){
    clear();
    game.play();
  }
  if(gameState===2&&finishedPlayers===4){
game.end();
  }
if(finishedPlayers===4){
  game.update(2);
}
}

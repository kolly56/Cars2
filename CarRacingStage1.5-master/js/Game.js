class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    car1 = createSprite(100,200);
    car1.addImage(c1);
    car2 = createSprite(300,200);
    car2.addImage(c2);
    car3 = createSprite(500,200);
    car3.addImage(c3);
    car4 = createSprite(700,200);   
    car4.addImage(c4);
    cars = [car1, car2, car3, car4];
  }

  play(){
    form.hide();

    Player.getPlayerInfo();
    player.getCarsAtEnd();


    if(allPlayers !== undefined){
      background(gr);
      //var display_position = 100;
     image(bg,0,-4*displayHeight,displayWidth,5*displayHeight); 
    
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 200;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        x = x + 220;
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance;
        cars[index-1].x = x;
        cars[index-1].y = y;

        if (index === player.index){
          fill("red");
          ellipse(x,y,60,60)
          cars[index - 1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y
        }
      textAlign(CENTER);
      textSize(20);
      text(allPlayers[plr].name,cars[index-1].x,cars[index-1].y+75)
      }

    }

    if(keyIsDown(UP_ARROW) && player.index !== null&&finish!==true){
      player.distance +=10
      player.update();
     // console.log(player.distance);
    }
if(player.distance>4400&&finish===false){
  //gameState=2;
  player.rank=player.rank+1;
  finishedPlayers=player.rank
  Player.updateCar(player.rank);
  finish=true;

}
    drawSprites();
  }
  end(){
    camera.position.x=0;
    camera.position.y=0;
    imageMode(CENTER);
    Player.getPlayerInfo();
    image(br,displayWidth/-4,displayHeight/9-100,200,240);
    image(sl,displayWidth/4,displayHeight/10-100,225,270);
    image(gl,0,-100,250,300);
    textAlign(CENTER);
    textSize(50);
    for(var i in allPlayers){
      if(allPlayers[i].rank===1){
        text("First:"+allPlayers[i].name,0,85);
      }
      else
      if(allPlayers[i].rank===2){
        text("Second:"+allPlayers[i].name,displayWidth/4,displayHeight/9+73); 
      }
      else
      if(allPlayers[i].rank===3){
        text("Third:"+allPlayers[i].name,displayWidth/-4,displayHeight/10+76); 
      }
      else{
        textSize(30);
        text("Fourth:"+allPlayers[i].name,0,255); 
      }
    }

  }
}

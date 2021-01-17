var database;
var position;

var balloon, balloonIMG, bgIMG;

function preload(){

  bgIMG = loadImage("Hot Air Ballon-01.png");
  balloonIMG = loadAnimation("Hot Air Ballon-02.png", "Hot Air Ballon-03.png","Hot Air Ballon-04.png");

}

function setup() {
  database = firebase.database();
  createCanvas(800,500);
  
  balloon = createSprite(116,-53,20,20);
  balloon.addAnimation("animation", balloonIMG);

  var balloonPosition = database.ref("balloon/position");
  balloonPosition.on("value", readPosition, showError);
}

function draw() {
  background(bgIMG);  
  drawSprites();

  textSize(20);
  noStroke();
  text("Use ARROW KEYS to fly the Hot Air Balloon", width/2, 20);

  if(position !== undefined){
    if(keyDown(LEFT_ARROW)){
        newPosition(-1,0);
        
    }
    else if(keyDown(RIGHT_ARROW)){
        newPosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        newPosition(0,-1);
        balloon.scale = balloon.scale - 0.005;
    }
    else if(keyDown(DOWN_ARROW)){
        newPosition(0,+1);
        balloon.scale = balloon.scale + 0.005;
    }
}

drawSprites();
}

function newPosition(x,y){
database.ref("balloon/position").set({
    "x": position.x + x, 
    "y": position.y + y
})
}

function readPosition(data){
position = data.val();

balloon.x = position.x;
balloon.y = position.y;
}

function showError(){
console.log("error in database");
}



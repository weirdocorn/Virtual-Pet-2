var dog, happyDog, database, foodS, food;
var dogImg, dogImg2, milkImg;
var addFoodbutton, feedFoodButton;
var lastfed;
var foodObject;

function preload()
{
  dogImg = loadImage("images/dogImg.png");
  dogImg2 = loadImage("images/dogImg2.png");
  milkImg = loadImage("images/Milk.png");
}

function setup() {
  createCanvas(500,500);

  dog = createSprite(250,475);
  dog.addImage(dogImg);
  
  database = firebase.database();
  
  foodStock = database.ref('Food');
  foodStock.on("value",readStock);
  
  food = new Food(250, 175);

  addFoodbutton = createButton("Add Food");
  addFoodbutton.position(150,200);
  addFoodButton.mousePressed(addFood);

  feedFoodButton = createButton("Feed the dog");
  feedFoodButton.position(350,200);
  feedFoodButton.mousePressed(feedDog);
}


function draw() {  
  background(46, 139, 87);

  drawSprites();

  strokeWeight(225,225,225);
  text("Bottles left = "+foodStock,250,100);
  
  food.display();
}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){
  database.ref('/').update({
    Food:x
  })
}
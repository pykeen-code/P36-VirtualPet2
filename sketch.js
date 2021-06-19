//Create variables here
var dog, happyDog; 
var database; 
var foodS, foodStock; 
var milk;
var fedTime, lastFed, feed, addFoods; 
var addButton, feedButton;
var foodObj; 


function preload()
{
	//load images here
  dogImg = loadImage("images/dogImg.png"); 
  dogHappyImg = loadImage("images/dogImg1.png"); 

}

function setup() {
  database = firebase.database(); 
  console.log(database); 
	createCanvas(1000, 400);

  foodObj = new Food(); 

  //foodstock ref to database
  foodStock= database.ref('Food'); 
  foodStock.on("value", readStock); 

  //dog
  dog = createSprite(800, 200, 150, 150);
  dog.scale = 0.1; 
  dog.addImage(dogImg); 
 
  //feed
  feedButton = createButton("Feed your pet"); 
  feedButton.position(730,95); 
  feedButton.mousePressed(feedDog); 
  //add food
  addButton = createButton("Get more food"); 
  addButton.position(830,95); 
  addButton.mousePressed(addFoods); 
}


function draw() {  
  console.log("inside draw function");
background(rgb(46, 10, 87));  

foodObj.display(); 

//refer time last fed to database
fedTime = database.ref('FeedTime'); 
fedTime.on("value", function (data){
  lastFed = data.val(); 
})

textSize(20); 
fill("red");
if(lastFed >= 12){
  text("Last Feed: "+ lastFed%12 + "PM", 400, 30); 
}
else if(lastFed == 0){
  text("Last Feed: 12 AM ", 400, 30); 
}
else{
  text("Last Feed: "+ lastFed + "AM", 400, 30); 
}
drawSprites();
}

//to read stock
function readStock(data){
  console.log("Inside readstock function");
  foodS=data.val(); 
  console.log("value of foodS =",foodS); 
  foodObj.updateFoodStock(foodS); 
}
//to update food stock and last fed time
function feedDog(){ 
  dog.addImage(dogHappyImg); 

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food: foodObj.getFoodStock(),
    FeedTime: hour()
  })
}

function addFoods(){
  foodS++; 
  console.log("Inside addFoods function");
  console.log("value of foodS =",foodS);
  database.ref('/').update({
    Food: foodS
  })
  dog.addImage(dogImg); 
}




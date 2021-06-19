class Food{
constructor(){ 
    console.log("inside Food constructor");
    this.foodStock = 1; 
    this.image = loadImage("images/Milk.png"); 
    this.lastFed;
}

updateFoodStock(foodStock){ 
    console.log("inside update food stock function");
    console.log("value of foodStock =",foodStock);
this.foodStock = foodStock; 
}

getFoodStock(){ 
return this.foodStock; 
}

getFedTime(lastFed){ 
    this.lastFed = lastFed;
}

deductFood(){ 
if(this.foodStock > 0){
    this.foodStock = this.foodStock-1;
}
}

display(){ 

console.log("inside display function =");
var x = 80, y = 100; 

imageMode(CENTER);
image(this.image, 725, 205, 70, 70); 
this.image.scale = 0.1; 
if(this.foodStock!=0){
    console.log("inside If statement");
    console.log("value of foodSTock =",this.foodStock);
    for(var i=0; i<this.foodStock; i++){
        console.log("inside for loop");
        console.log("value of foodS =",this.foodStock);
        if(i%10==0){
            x=80; 
            y+=50; 
        }
        image(this.image, x, y, 50, 50); 
        x=x+30; 
    }
}

}
}
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var mouseX, mouseY, mouseClicked;
var posX,posY;

var gridSize = 5;

var blocks = [];

var colorNum = 0;
var color = "black";

function block(x,y,size,color){
	this.x = x;
	this.y = y;
	this.size = size;
	this.color = color

	this.draw = function(){
		ctx.fillStyle = this.color;
		ctx.fillRect(this.x,this.y,this.size,this.size);
	}
}

function changeColor(){
	
	if(colorNum < 7){
		colorNum ++;
	}else{
		colorNum = 0;
	}

	if(colorNum === 0){
		color="black";
	}else if(colorNum === 1){
		color="blue";
	}else if(colorNum === 2){
		color="green";
	}else if(colorNum === 3){
		color="red";
	}else if(colorNum === 4){
		color="yellow";
	}else if(colorNum === 5){
		color="gray";
	}else if(colorNum === 6){
		color="#996600";
	}else if(colorNum === 7){
		color="white";
	}
}

canvas.addEventListener('contextmenu', function(evt) { 
  evt.preventDefault();
}, false);

canvas.addEventListener('mousemove', function(evt) {
	if (evt.offsetX) {
        mouseX = evt.offsetX;
        mouseY = evt.offsetY;
    }
    if(mouseClicked){
		blocks.push(new block(posX*gridSize,posY*gridSize,gridSize,color));
	}
});

canvas.addEventListener('mousedown', function(evt){
	if(evt.button === 0){
		blocks.push(new block(posX*gridSize,posY*gridSize,gridSize));
		mouseClicked = true;
	}else if(evt.button === 1){
		changeColor();
	}else if(evt.button === 2){
		blocks.splice(blocks.length-1,1);
	}
});

canvas.addEventListener('mouseup', function(evt){
	if(evt.button === 0){
		mouseClicked = false;
	}
});

canvas.addEventListener('wheel', function(evt){
	if(evt.deltaY > 0){
		gridSize ++;
	}else{
		if(gridSize > 1)
			gridSize--;
	}
	console.log(gridSize);
});

function update(){
	ctx.clearRect(0,0,canvas.width,canvas.height);
	posX = Math.floor(mouseX/gridSize);
    posY = Math.floor(mouseY/gridSize);

	for(var i = 0; i < blocks.length; i++){
		blocks[i].draw();
	}
	ctx.fillStyle = color;
	ctx.fillRect(posX*gridSize,posY*gridSize,gridSize,gridSize);
}

setInterval(update,1000/60);
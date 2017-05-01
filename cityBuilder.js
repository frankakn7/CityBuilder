var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var mouseX, mouseY, mouseClicked;
var posX,posY;

var gridSize = 1;

var blocks = [];

function block(x,y,size){
	this.x = x;
	this.y = y;
	this.size = size;

	this.draw = function(){
		ctx.fillRect(this.x,this.y,this.size,this.size);
	}
}

canvas.addEventListener('mousemove', function(evt) {
	if (evt.offsetX) {
        mouseX = evt.offsetX;
        mouseY = evt.offsetY;
    }
});

canvas.addEventListener('mousedown', function(evt){
	if(evt.button === 0){
		blocks.push(new block(posX*gridSize,posY*gridSize,gridSize));
		mouseClicked = true;
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
		gridSize--;
	}
	console.log(gridSize);
});

function update(){
	ctx.clearRect(0,0,canvas.width,canvas.height);
	posX = Math.floor(mouseX/gridSize);
    posY = Math.floor(mouseY/gridSize);

	if(mouseClicked){
		blocks.push(new block(posX*gridSize,posY*gridSize,gridSize));
	}
	ctx.fillRect(posX*gridSize,posY*gridSize,gridSize,gridSize);
	for(var i = 0; i < blocks.length; i++){
		blocks[i].draw();
	}
}

setInterval(update,1000/60);
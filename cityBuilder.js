var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var mouseX, mouseY;
var lassoX1,lassoY1,lassoX2,lassoY2,isMouseDragging;

canvas.addEventListener('mousemove', function(evt) {
	if (evt.offsetX) {
        mouseX = evt.offsetX;
        mouseY = evt.offsetY;
    }else if (evt.layerX) {
        mouseX = evt.layerX;
        mouseY = evt.layerY;
    }
	
	if(isMouseDragging){
		lassoX2 = mouseX;
		lassoY2 = mouseY;
		OutlineRect(lassoX1, lassoY1, lassoX2, lassoY2, 'red');
	}
});

canvas.addEventListener('mousedown', function(evt){
	if(evt.button === 0){
		lassoX1 = mouseX;
		lassoY1 = mouseY;
		lassoX2 = lassoX1;
		lassoY2 = lassoY1;
		isMouseDragging = true;
	}
});

canvas.addEventListener('mouseup', function(evt){
	if(evt.button === 0){
		isMouseDragging = false;
	}
});

function getAngleDeg(p1x,p1y,p2x,p2y){
	return(Math.atan2(p2y - p1y, p2x - p1x) * 180 / Math.PI);
}

function OutlineRect(corner1X, corner1Y, corner2X, corner2Y, lineColor) {
	ctx.clearRect(0,0,canvas.width,canvas.height);
	ctx.save();
    ctx.strokeStyle = lineColor;
    ctx.beginPath();
    ctx.rect(corner1X, corner1Y, corner2X-corner1X, corner2Y-corner1Y);
    ctx.translate((corner2X-corner1X)/2,(corner2Y-corner1Y)/2);
    ctx.rotate(getAngleDeg(corner1X,corner1Y,corner2X,corner2Y));
    ctx.stroke();
    ctx.restore();
}

ctx.fillRect(10,5,10,10);
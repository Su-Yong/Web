var led = new Array();

function main() {
	window.onresize = resize;
	
	el_canvas.style.width = window.innerWidth;
	el_canvas.style.height = window.innerHeight;

	var el_canvas = document.getElementById("canvas-background");
	var canvas = el_canvas.getContext("2d");
	
	canvas.fillStyle = "#000000";
	canvas.fillRect(0, 0, 300, 300);
	
	canvas.fillStyle = "#ff4a00";
	canvas.beginPath();
	
	for(var i = 0; i < 50; i++) {
		var obj = {x:Math.random() * window.innerWidth, y:Math.random() * innerHeight};
		
		canvas.arc(obj.x, obj.y, 5, 0, 360 * Math.PI / 180, true);
		canvas.fill();
	}
	canvas.closePath();
}

function resize(e) {
	var el_canvas = document.getElementById("canvas-background");
	
	el_canvas.style.width = window.innerWidth + "px";
	el_canvas.style.height = window.innerHeight * 2 + "px";
	//alert(window.innerWidth + " " + window.innerHeight);
}

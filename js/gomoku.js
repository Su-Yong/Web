const Color = {
	BLACK: 1,
	WHITE: 0
};

const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;

const Gomoku = {
	WIDTH: 450,
	HEIGHT: 450
};

function AISystem() {
	var stone = Color.WHITE;
}

var AI = new AISystem();

canvas.onmousedown = function(event) {
  var real_x = event.pageX;
  var real_y = event.pageY;

	var x = real_x / 30;
	var y = real_y / 30;
}

window.onload = function() {
}

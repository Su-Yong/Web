var dirc = {
	up: 0,
	down: 1,
	left: 2,
	right: 3
};

var Snake = {
	length: 5,
	maxLength: 50,
	dirc: dirc.left,

	Cube: function() {}
};
Snake.Cube.prototype = {
	x: 150,
	y: 150,
	dirc: dirc.left
}
var coord = function() {};
coord.prototype = {
	x: 0,
	y: 0
};

var coin_p = function() {};
coin_p.prototype = {
	x: Math.floor(Math.random() * 50) * 10,
	y: Math.floor(Math.random() * 50) * 10,
}

var coin = new coin_p();

var count = 0;
var time = 0;
var score = 0;
var gt = 10;

window.onload = function() {
	var cube = [
		new Snake.Cube(),
		new Snake.Cube(),
		new Snake.Cube(),
		new Snake.Cube(),
		new Snake.Cube(),
	];
	
	cube[1].x = 140;
	cube[2].x = 130;
	cube[3].x = 120;
	cube[4].x = 110;
	
	var cc = new Array();
	
	var canvas = document.getElementById('play-canvas');
	canvas.focus();
	var ctx = canvas.getContext('2d');
	
	var scorecanvas = document.getElementById('score');
	var sc = canvas.getContext('2d');

	setInterval(function() {
		ctx.fillStyle = "rgb(255, 215, 0)";
    	ctx.fillRect(coin.x, coin.y, 10, 10);

    	ctx.fillStyle = "#2d2d2d";
   		ctx.fillRect(cube[0].x, cube[0].y, 10, 10);
    	
    	switch(Snake.dirc) {
			case dirc.up:
				cube[0].y -= 10;
			break;
			case dirc.down:
				cube[0].y += 10;
			break;
			case dirc.left:
				cube[0].x -= 10;
			break;
			case dirc.right:
				cube[0].x += 10;
			break;
		}

		if(cube[0].x < 0 || cube[0].x > 500 || cube[0].y < 0 || cube[0].y > 500) {
			alert("you are die!\npress ok button than restart");
			location.reload();
		}

		for(var i = 1; i < cube.length; i++) {
			if(cube[0].x == cube[i].x && cube[0].y == cube[i].y && time > 6) {
				alert("you are die!\npress ok button than restart");
				location.reload();
			}
		}

		if(gt == 0) {
			alert("you are die!\npress ok button than restart");
			location.reload();
		}

		if(coin.x == cube[0].x && coin.y == cube[0].y) {
			score++;
			coin.x = Math.floor(Math.random() * 50) * 10;
			coin.y = Math.floor(Math.random() * 50) * 10;
			Snake.length++;
			var v = new Snake.Cube();
			v.x = cc[time - cube.length];
			cube.push(v);
			gt += (4 - length / 50 * 2);
			gt = Math.min(10, gt);
		}

		ctx.fillStyle = "rgb(0, 164, 255)";
    	ctx.fillRect(cube[0].x, cube[0].y, 10, 10);

		var cor = new coord();
		cor.x = cube[0].x;
		cor.y = cube[0].y;
		cc.push(cor);

		for(var i = 1; i < cube.length; i++) {
			try {
				ctx.fillStyle = "#2d2d2d";
    			ctx.fillRect(cube[i].x, cube[i].y, 10, 10);
    			
    			cube[i].x = cc[time - i].x;
				cube[i].y = cc[time - i].y;
			
				ctx.fillStyle = "rgb(0, 164, 255)";
    			ctx.fillRect(cube[i].x, cube[i].y, 10, 10);
    		} catch(err) {
    			// alert(err);
    		}
		}

		time++;

		gt -= 0.1;

		sc.fillStyle = "#2d2d2d";
		sc.fillRect(6, 510, 490, 20);
		sc.fillStyle = "#fafafa";
		sc.fillRect(0, 500, 500, 4);
		sc.fillStyle = "rgb(255, 215, 0)";
		sc.fillRect(6, 510, 6 + score * 5, 10);
		sc.fillStyle = "rgb(55, 215, 0)";
		sc.fillRect(6, 520, 6 + gt * 44, 10);
		sc.fillStyle = "rgb(255, 215, 0)";
		sc.font = "20px Verdana";
		sc.fillText(score + "", 470, 527);
	}, 100 - length * 5);
}

window.onkeydown = function(event) {
	if(event.keyCode >= 37 && event.keyCode <= 40) {
		if(event.keyCode == 37 && Snake.dirc != dirc.right)
			Snake.dirc = dirc.left;
		else if(event.keyCode == 38 && Snake.dirc != dirc.down)
			Snake.dirc = dirc.up;
		else if(event.keyCode == 39 && Snake.dirc != dirc.left)
			Snake.dirc = dirc.right;
		else if(event.keyCode == 40 && Snake.dirc != dirc.up)
			Snake.dirc = dirc.down;
	}
}
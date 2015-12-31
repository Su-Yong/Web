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
var time_coin = new coin_p();

var count = 0;
var time = 0;
var score = 0;
var gt = 10;
var start = true;

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

    canvas.onmousedown = function(event) {
        var x = event.pageX;
        var y = event.pageY;

        if (y > 405) {
            if (Snake.dirc != dirc.up)
                Snake.dirc = dirc.down;
        } else if (y < 155) {
            if (Snake.dirc != dirc.down)
                Snake.dirc = dirc.up;
        } else {
            if (x > 640) {
                if (Snake.dirc != dirc.left)
                    Snake.dirc = dirc.right;
            } else {
                if (Snake.dirc != dirc.right)
                    Snake.dirc = dirc.left;
            }
        }
    }
    var ctx = canvas.getContext('2d');

    var scorecanvas = document.getElementById('score');
    var sc = canvas.getContext('2d');

    time_coin.x = Math.floor(Math.random() * 50) * 10;
    time_coin.y = Math.floor(Math.random() * 50) * 10;

    setInterval(function() {
        if (start) {
        	sc.fillStyle = "#2d2d2d";
            sc.fillRect(190, 225, 130, 42);
            
            ctx.fillStyle = "rgb(255, 215, 0)";
            ctx.fillRect(coin.x, coin.y, 10, 10);

            ctx.fillStyle = "rgb(255, 0, 164)";
            ctx.fillRect(time_coin.x, time_coin.y, 10, 10);

            ctx.fillStyle = "#2d2d2d";
            ctx.fillRect(cube[0].x, cube[0].y, 10, 10);

            switch (Snake.dirc) {
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

            if (cube[0].x < 0 || cube[0].x > 500 || cube[0].y < 0 || cube[0].y > 500) {
                alert("you are die!\npress ok button than restart");
                location.reload();
            }

            for (var i = 1; i < cube.length; i++) {
                if (cube[0].x == cube[i].x && cube[0].y == cube[i].y && time > 6) {
                    alert("you are die!\npress ok button than restart");
                    location.reload();
                }
            }

            if (gt <= 0) {
                alert("you are die!\npress ok button than restart");
                location.reload();
            }

            if (coin.x == cube[0].x && coin.y == cube[0].y) {
                score += (0 > (gt - 2)) ? 3 + Math.floor(Math.random() * 2) : 1 + Math.floor(Math.random() * 2);
                coin.x = Math.floor(Math.random() * 50) * 10;
                coin.y = Math.floor(Math.random() * 50) * 10;
                Snake.length++;
                var v = new Snake.Cube();
                v.x = cc[time - cube.length];
                cube.push(v);
                gt += (4 - length / 50 * 2);
                gt = Math.min(10, gt);
            }

            if (time_coin.x == cube[0].x && time_coin.y == cube[0].y) {
                score++;
                time_coin.x = Math.floor(Math.random() * 50) * 10;
                time_coin.y = Math.floor(Math.random() * 50) * 10;
                Snake.length++;
                gt += (6 - length / 50 * 2);
                gt = Math.min(10, gt);
            }

            ctx.fillStyle = "rgb(0, 164, 255)";
            ctx.fillRect(cube[0].x, cube[0].y, 10, 10);

            var cor = new coord();
            cor.x = cube[0].x;
            cor.y = cube[0].y;
            cc.push(cor);

            for (var i = 1; i < cube.length; i++) {
                try {
                    ctx.fillStyle = "#2d2d2d";
                    ctx.fillRect(cube[i].x, cube[i].y, 10, 10);

                    cube[i].x = cc[time - i].x;
                    cube[i].y = cc[time - i].y;

                    ctx.fillStyle = "rgb(0, 164, 255)";
                    ctx.fillRect(cube[i].x, cube[i].y, 10, 10);
                } catch (err) {
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
            sc.font = "20px Gray Design Bold";
            sc.fillText(score + "", 470, 527);
        } else {
        	sc.fillStyle = "#2d2d2d";
            sc.fillRect(190, 225, 130, 42);
        	sc.fillStyle = "#fafafa";
            sc.font = "42px Gray Design Medium";
        	sc.fillText("Pause", 195, 260);
        }
    }, 100 - length * 20);
}

window.onkeydown = function(event) {
    if (event.keyCode >= 37 && event.keyCode <= 40) {
        if (event.keyCode == 37 && Snake.dirc != dirc.right)
            Snake.dirc = dirc.left;
        else if (event.keyCode == 38 && Snake.dirc != dirc.down)
            Snake.dirc = dirc.up;
        else if (event.keyCode == 39 && Snake.dirc != dirc.left)
            Snake.dirc = dirc.right;
        else if (event.keyCode == 40 && Snake.dirc != dirc.up)
            Snake.dirc = dirc.down;
    }
    if (event.keyCode == 32) {
        start = !start;
    }
}
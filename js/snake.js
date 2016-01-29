var dirc = {
  up: 0,
  down: 1,
  left: 2,
  right: 3
}; // Direction const.

var Snake = {
  length: 5,
  maxLength: 50,
  dirc: dirc.left,

  Cube: function() {}
}; // Snake Cube manager

Snake.Cube.prototype = {
  x: 150,
  y: 150,
  dirc: dirc.left
}; // Each snake object

var coord = function() {};
coord.prototype = {
  x: 0,
  y: 0
}; // Coordinate variable

var coin_p = function() {};
coin_p.prototype = {
  x: Math.floor(Math.random() * 50) * 10,
  y: Math.floor(Math.random() * 50) * 10,
} // coin object prototype

var coin = new Array(); // coin; score 1~4, time 0.5 ~ 2
var time_coin = new Array(); // time coin 2 ~ 4
var super_coin = new coin_p(); // super coin; score 10 time 0.1 ~ 0.5
var ts_coin = new coin_p(); // time to score coin; score 6 ~ 12 time -3 ~ -6
var st_coin = new coin_p(); // score to time coin; score -14 ~ -10 time 6 ~ 10

var count = 0;
var time = 0;
var score = 0;
var gt = 10;
var start = true;
var COIN_MAX = 20;
var game_speed = 0;

const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;

window.onload = function() {
  var cube = [
    new Snake.Cube(),
    new Snake.Cube(),
    new Snake.Cube(),
    new Snake.Cube(),
    new Snake.Cube(),
  ]; // 5 length snake

  cube[1].x = 140; // setting line
  cube[2].x = 130; // setting line
  cube[3].x = 120; // setting line
  cube[4].x = 110; // setting line

  var cc = new Array();

  var canvas = document.getElementById('play-canvas');
  canvas.focus();

  canvas.onmousedown = function(event) {
    var x = event.pageX;
    var y = event.pageY;

    if(start == 2) {
      if(x > WIDTH / 2 - 60 && y > HEIGHT / 2 - 20 && x < WIDTH / 2 + 60 && y < HEIGHT / 2 + 20) {
        window.location.reload();
      }
    }
    if(start == 2) {
      if(x > WIDTH / 2 - 80 && y > HEIGHT / 2 + 20 && x < WIDTH / 2 + 80 && y < HEIGHT / 2 + 60) {
        window.location = "../index.html";
      }
    }

    /*
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
    }*/
  }

  var ctx = canvas.getContext('2d');

  var scorecanvas = document.getElementById('score');
  var sc = canvas.getContext('2d');

  for(var i = 0; i < COIN_MAX / 2; i++) {
    var tCoin = new coin_p();
    tCoin.x = Math.floor(Math.random() * 50) * 10;
    tCoin.y = Math.floor(Math.random() * 50) * 10;

    time_coin.push(tCoin);
  }
  for(var i = 0; i < COIN_MAX - (COIN_MAX / 2); i++) {
    var cCoin = new coin_p();
    cCoin.x = Math.floor(Math.random() * 50) * 10;
    cCoin.y = Math.floor(Math.random() * 50) * 10;

    coin.push(cCoin);
  }

  super_coin.x = Math.floor(Math.random() * 50) * 10;
  super_coin.y = Math.floor(Math.random() * 50) * 10;

  ts_coin.x = Math.floor(Math.random() * 50) * 10;
  ts_coin.y = Math.floor(Math.random() * 50) * 10;

  st_coin.x = Math.floor(Math.random() * 50) * 10;
  st_coin.y = Math.floor(Math.random() * 50) * 10;

  setInterval(function() {
    if (start == true) {
      sc.fillStyle = "#2d2d2d";
      sc.fillRect(190, 225, 130, 42);

      ctx.fillStyle = "rgb(255, 215, 0)";
      for(var i = 0; i < coin.length; i++) {
        ctx.fillRect(coin[i].x, coin[i].y, 10, 10);
      }

      ctx.fillStyle = "rgb(255, 0, 164)";
      for(var i = 0; i < time_coin.length; i++) {
        ctx.fillRect(time_coin[i].x, time_coin[i].y, 10, 10);
      }

      ctx.fillStyle = "rgb(255, 55, 55)";
      ctx.fillRect(super_coin.x, super_coin.y, 10, 10);

      ctx.fillStyle = "rgb(55, 55, 255)";
      ctx.fillRect(ts_coin.x, ts_coin.y, 10, 10);

      ctx.fillStyle = "rgb(55, 255, 55)";
      ctx.fillRect(st_coin.x, st_coin.y, 10, 10);

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
      } // set first snake cube's direction

      if (cube[0].x < 0 || cube[0].x >= 490 || cube[0].y < 0 || cube[0].y >= 490) {
        start = 2;
      } // out map

      for (var i = 1; i < cube.length; i++) {
        if (cube[0].x == cube[i].x && cube[0].y == cube[i].y && time > 6) {
          start = 2;
        }
      } // tail collision check

      if (gt <= 0) {
        start = 2;
      } // time out

      for(var i = 0; i < coin.length; i++) {
        if (coin[i].x == cube[0].x && coin[i].y == cube[0].y) {
          score += (0 > (gt - 2)) ? 3 + Math.floor(Math.random() * 2) : 1 + Math.floor(Math.random() * 2);
          coin[i].x = Math.floor(Math.random() * 50) * 10;
          coin[i].y = Math.floor(Math.random() * 50) * 10;

          var add_num = Math.ceil(Math.random() * 2);
          for(var i = 0; i < add_num; i++) {
            Snake.length++;
            var v = new Snake.Cube();
            v.x = cc[time - cube.length];
            cube.push(v);
          }

          gt += Math.max(1/3, (3 - length / 50 * 2));
          gt = Math.min(10, gt);
        }
      } // eat coin -> remove coin and create new coin

      for(var i = 0; i < time_coin.length; i++) {
        if (time_coin[i].x == cube[0].x && time_coin[i].y == cube[0].y) {
          score++;
          time_coin[i].x = Math.floor(Math.random() * 50) * 10;
          time_coin[i].y = Math.floor(Math.random() * 50) * 10;
          Snake.length++;
          var v = new Snake.Cube();
          v.x = cc[time - cube.length];
          cube.push(v);
          gt += Math.max(1, (4 - length / 50 * 2));
          gt = Math.min(10, gt);
        }
      } // eat time coin -> same

      if (super_coin.x == cube[0].x && super_coin.y == cube[0].y) {
        score += 10 + Math.round(Math.random() * 4) - 2;
        super_coin.x = Math.floor(Math.random() * 50) * 10;
        super_coin.y = Math.floor(Math.random() * 50) * 10;

        gt += Math.max(0.1, (Math.floor(Math.random() * 5)) / 10);
        gt = Math.min(10, gt);

        game_speed += 10;

        for(var i = 0; i < 6; i++) {
          Snake.length++;
          var v = new Snake.Cube();
          v.x = cc[time - cube.length];
          cube.push(v);
        }
      }

      if (ts_coin.x == cube[0].x && ts_coin.y == cube[0].y) {
        score += 8 + Math.round(Math.random() * 4);
        ts_coin.x = Math.floor(Math.random() * 50) * 10;
        ts_coin.y = Math.floor(Math.random() * 50) * 10;

        gt -= 3 + (Math.floor(Math.random() * 3));
        gt = Math.max(0, Math.min(10, gt));
      }

      if (st_coin.x == cube[0].x && st_coin.y == cube[0].y) {
        score -= 10 + Math.round(Math.random() * 4);
        st_coin.x = Math.floor(Math.random() * 50) * 10;
        st_coin.y = Math.floor(Math.random() * 50) * 10;

        gt += Math.max(6, 6 + Math.ceil(Math.random() * 4));
        gt = Math.min(10, gt);

        game_speed--;

        for(var i = 0; i < 8; i++) {
          Snake.length--;
          ctx.fillStyle = "#2d2d2d";
          ctx.fillRect(cube[Snake.length - i - 1].x, cube[Snake.length - i - 1].y, 10, 10);
        }
        for(var i = 0; i < 8; i++) {
          Snake.length--;
          ctx.fillStyle = "#2d2d2d";
          ctx.fillRect(cube[Snake.length - i - 1].x, cube[Snake.length - i - 1].y, 10, 10);
          cube.splice(Snake.length, 1);
        }
      }

      ctx.fillStyle = "rgb(0, 164, 255)";
      ctx.fillRect(cube[0].x, cube[0].y, 10, 10); // draw snake cube

      var cor = new coord(); // follow first cube system: coordinate following
      cor.x = cube[0].x;
      cor.y = cube[0].y;
      cc.push(cor); // remember coordinate

      for (var i = 1; i < cube.length; i++) {
        try {
          ctx.fillStyle = "#2d2d2d";
          ctx.fillRect(cube[i].x, cube[i].y, 10, 10);

          cube[i].x = cc[time - i].x;
          cube[i].y = cc[time - i].y;

          ctx.fillStyle = "rgb(0, 164, 255)";
          ctx.fillRect(cube[i].x, cube[i].y, 10, 10); // follow source
        } catch (err) {
          // alert(err);
        }
      }

      time++; // add time

      gt -= 0.1; // add game time

      sc.fillStyle = "#2d2d2d";
      sc.fillRect(6, 510, 495, 20);
      sc.fillStyle = "#fafafa";
      sc.fillRect(0, 500, 500, 4);

      if(score >= 0) {
        sc.fillStyle = "rgb(255, 215, 0)";
      } else {
        sc.fillStyle = "rgb(255, 55, 0)";
      }
      sc.fillRect(6, 510, Math.abs(1 + score / 1.5), 8);
      sc.fillStyle = "rgb(55, 215, 0)";
      sc.fillRect(6, 522, 6 + gt * 42, 8);
      sc.fillStyle = "rgb(255, 215, 0)";
      sc.font = "20px Gray Design Bold";
      sc.fillText(score + "", 440, 527); // draw gui, example: score, time
    } else if(!start) {
      sc.fillStyle = "#2d2d2d";
      sc.fillRect(190, 225, 130, 42);
      sc.fillStyle = "#fafafa";
      sc.font = "42px Gray Design Medium";
      sc.fillText("Pause", 195, 260);
    } else {
      die(ctx, sc);
    }
  }, 100 - game_speed - (length * 20));
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
    if(start != 2) {
      start = !start;
    } else {
      window.location.reload();
    }
  }
}

function die(ctx, sc) {
  sc.fillStyle = "rgba(128, 45, 45, 45)";
  sc.fillRect(0, 0, 500, 500); // set background

  sc.fillStyle = "#fafafa";
  sc.font = "42px Gray Design Medium";
  sc.fillText("Game Over", 145, 240); // Gameover title

  var refresh = document.getElementById("refresh");
  sc.drawImage(refresh, 200, 270, 24, 24); // replay icon

  sc.font = "24px Gray Design Medium";
  sc.fillText("Replay!", 230, 289); // replay setting

  var back = document.getElementById("back");
  sc.drawImage(back, 175, 300, 24, 24); // back icon

  sc.font = "24px Gray Design Medium";
  sc.fillText("Back to Web", 205, 319); // back setting

  sc.fillStyle = "#2d2d2d";
  sc.fillRect(0, 500, 500, 36);

  sc.fillStyle = "#fafafa";
  sc.fillRect(0, 500, 500, 4);

  sc.fillText("Score: " + score, 6, 528);
  if(score >= 0) {
    sc.fillStyle = "rgb(255, 215, 0)";
  } else {
    sc.fillStyle = "rgb(255, 55, 0)";
  }
  sc.fillRect(140, 512, Math.abs(1 + score / 1.5, 1), 16);
}

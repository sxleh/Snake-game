var canvas = document.getElementById('game');
var context = canvas.getContext('2d');

var score = 0
var highscore = 0


var grid = 16;
var count = 0;

var snake = {
  x: 160,
  y: 160,

  
  dx: grid,
  dy: 0,

  
  cells: [],

  
  maxCells: 5
};
var apple = {
  x: 320,
  y: 320
};


function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function reset(){
    snake.x = 160;
    snake.y = 160;
    snake.cells = [];
    snake.maxCells = 4;
    snake.dx = grid;
    snake.dy = 0;
    score=0;
    apple.x = getRandomInt(0, 25) * grid;
    apple.y = getRandomInt(0, 25) * grid;
}


function loop() {
  requestAnimationFrame(loop);

  
  if (++count < 4) {
    return;
  }

  count = 0;
  context.clearRect(0,0,canvas.width,canvas.height);

  
  snake.x += snake.dx;
  snake.y += snake.dy;

  
  if (snake.x < 0) {
    reset();
  }
  else if (snake.x >= canvas.width) {
    reset();
  }

  
  if (snake.y < 0) {
    reset();
  }
  else if (snake.y >= canvas.height) {
    reset();
  }

  
  snake.cells.unshift({x: snake.x, y: snake.y});

  
  if (snake.cells.length > snake.maxCells) {
    snake.cells.pop();
  }

  
  context.fillStyle = 'red';
  context.fillRect(apple.x, apple.y, grid-1, grid-1);

  
  context.fillStyle = 'green';
  snake.cells.forEach(function(cell, index) {

    
    context.fillRect(cell.x, cell.y, grid-1, grid-1);

    
    if (cell.x === apple.x && cell.y === apple.y) {
      snake.maxCells++;
      score++;

      
      apple.x = getRandomInt(0, 25) * grid;
      apple.y = getRandomInt(0, 25) * grid;
    }

    
    for (var i = index + 1; i < snake.cells.length; i++) {

      
      if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
        reset();
        
      }
    }
  });
  if (score > highscore) {
    highscore = score;
  }
  
  context.fillStyle = 'white';
  context.font = '16px Arial';
  context.fillText('Score: ' + score, 10, 20);
  context.fillText('Highscore: ' + highscore, 10, 40);
    
}


document.addEventListener('keydown', function(e) {
    
  
    //left
    if ((e.which === 37 || e.which === 65) && snake.dx === 0) {
      snake.dx = -grid;
      snake.dy = 0;
    }
    //up
    else if ((e.which === 38 || e.which === 87) && snake.dy === 0) {
      snake.dy = -grid;
      snake.dx = 0;
    }
    //right
    else if ((e.which === 39 || e.which === 68) && snake.dx === 0) {
      snake.dx = grid;
      snake.dy = 0;
    }
    //down
    else if ((e.which === 40 || e.which === 83) && snake.dy === 0) {
      snake.dy = grid;
      snake.dx = 0;
    }
  });
  




requestAnimationFrame(loop);
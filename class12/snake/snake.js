const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
const grid = 20;
const size = canvas.width / grid;

let snake, food, dir, score, alive;

function reset() {
  snake = [{x: 10, y: 10}];
  food = {x: 15, y: 15};
  dir = {x: 1, y: 0};
  score = 0;
  alive = true;
}

function placeFood() {
  while (true) {
    const f = {x: Math.floor(Math.random()*size), y: Math.floor(Math.random()*size)};
    if (!snake.some(s => s.x === f.x && s.y === f.y)) { food = f; return; }
  }
}

function step() {
  if (!alive) return;
  const head = {x: snake[0].x + dir.x, y: snake[0].y + dir.y};

  if (head.x < 0 || head.y < 0 || head.x >= size || head.y >= size || snake.some(s => s.x===head.x && s.y===head.y)) {
    alive = false;
    return;
  }

  snake.unshift(head);
  if (head.x === food.x && head.y === food.y) {
    score++;
    placeFood();
  } else {
    snake.pop();
  }
}

function draw() {
  ctx.clearRect(0,0,canvas.width,canvas.height);
  ctx.fillStyle = '#f43f5e';
  ctx.fillRect(food.x*grid, food.y*grid, grid-1, grid-1);

  ctx.fillStyle = '#4ade80';
  snake.forEach((s, i) => {
    ctx.fillRect(s.x*grid, s.y*grid, grid-1, grid-1);
  });

  ctx.fillStyle = '#e5e7eb';
  ctx.font = '16px system-ui';
  ctx.fillText(`Score: ${score}`, 10, 20);

  if (!alive) {
    ctx.fillStyle = '#fff';
    ctx.font = '20px system-ui';
    ctx.fillText('Game Over - Space to restart', 70, 200);
  }
}

document.addEventListener('keydown', (e) => {
  const k = e.key.toLowerCase();
  if ((k === 'arrowup' || k === 'w') && dir.y !== 1) dir = {x:0,y:-1};
  if ((k === 'arrowdown' || k === 's') && dir.y !== -1) dir = {x:0,y:1};
  if ((k === 'arrowleft' || k === 'a') && dir.x !== 1) dir = {x:-1,y:0};
  if ((k === 'arrowright' || k === 'd') && dir.x !== -1) dir = {x:1,y:0};
  if (k === ' ' && !alive) reset();
});

reset();
setInterval(() => { step(); draw(); }, 110);

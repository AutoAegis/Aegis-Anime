const container = document.querySelector('.snake-container');

const imagesList = [
  'https://github.com/AutoAegis/Aegis-Anime/blob/main/Aegis%20White.png?raw=true',
  'https://github.com/AutoAegis/Aegis-Anime/blob/main/Aegis%20Org.png?raw=true',
  'https://github.com/AutoAegis/Aegis-Anime/blob/main/Aegis%20Purple.png?raw=true',
  'https://github.com/AutoAegis/Aegis-Anime/blob/main/Aegis%20Red.png?raw=true'
];

const snakeLength = 7;
const segmentSpacing = 70;
const speed = 2.2;
const amplitude = 30;
const waveSpeed = 0.06;
const spawnInterval = 2000;
const rowPadding = 90;

let snakes = [];

function randomImage() {
  return imagesList[Math.floor(Math.random() * imagesList.length)];
}

function createSnake(direction) {
  const yBase = Math.random() * (window.innerHeight - rowPadding * 2) + rowPadding;

  const snake = {
    direction,
    phase: Math.random() * Math.PI * 2,
    segments: []
  };

  for (let i = 0; i < snakeLength; i++) {
    const img = document.createElement('img');
    img.src = randomImage();
    img.className = 'snake-image';

    const startX = direction === 1
      ? -i * segmentSpacing
      : window.innerWidth + i * segmentSpacing;

    container.appendChild(img);

    snake.segments.push({
      img,
      x: startX,
      y: yBase
    });
  }

  snakes.push(snake);
}

for (let i = 0; i < 4; i++) {
  createSnake(i % 2 === 0 ? 1 : -1);
}

setInterval(() => {
  createSnake(Math.random() > 0.5 ? 1 : -1);
}, spawnInterval);

function animate() {
  snakes.forEach((snake, sIndex) => {
    snake.phase += waveSpeed;

    const head = snake.segments[0];
    head.x += snake.direction * speed;
    head.y += Math.sin(snake.phase) * 0.8;

    if (snake.direction === 1 && head.x > window.innerWidth + segmentSpacing * snakeLength) {
      snake.segments.forEach((seg, i) => {
        seg.x = -i * segmentSpacing;
      });
    }

    if (snake.direction === -1 && head.x < -segmentSpacing * snakeLength) {
      snake.segments.forEach((seg, i) => {
        seg.x = window.innerWidth + i * segmentSpacing;
      });
    }

    for (let i = 1; i < snake.segments.length; i++) {
      const prev = snake.segments[i - 1];
      const seg = snake.segments[i];

      const dx = prev.x - seg.x;
      const dy = prev.y - seg.y;
      const dist = Math.hypot(dx, dy);
      const angle = Math.atan2(dy, dx);

      if (dist > segmentSpacing) {
        seg.x = prev.x - Math.cos(angle) * segmentSpacing;
        seg.y = prev.y - Math.sin(angle) * segmentSpacing;
      }
    }

    snake.segments.forEach((seg, i) => {
      const wave = Math.sin(snake.phase - i * 0.6) * amplitude;

      seg.img.style.transform = `
        translate(${seg.x}px, ${seg.y + wave}px)
        rotate(${snake.direction === 1 ? 0 : 180}deg)
      `;
    });
  });

  requestAnimationFrame(animate);
}

animate();

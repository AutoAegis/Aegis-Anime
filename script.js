const container = document.querySelector('.snake-container');

const imagesList = [
  'https://github.com/AutoAegis/Aegis-Anime/blob/main/Aegis%20White.png?raw=true',
  'https://github.com/AutoAegis/Aegis-Anime/blob/main/Aegis%20Org.png?raw=true',
  'https://github.com/AutoAegis/Aegis-Anime/blob/main/Aegis%20Purple.png?raw=true',
  'https://github.com/AutoAegis/Aegis-Anime/blob/main/Aegis%20Red.png?raw=true'
];

const snakeCount = 5;
const snakeLength = 6;
const speed = 2.5;
const amplitude = 25;
const waveSpeed = 0.08;
const segmentSpacing = 50;
const rowSpacing = 120;

let snakes = [];

function randomImage() {
  return imagesList[Math.floor(Math.random() * imagesList.length)];
}

function createSnake(yBase, direction) {
  const snake = {
    direction,
    phase: Math.random() * Math.PI * 2,
    segments: []
  };

  for (let i = 0; i < snakeLength; i++) {
    const img = document.createElement('img');
    img.src = randomImage();
    img.className = 'snake-image';

    img.x = direction === 1
      ? -i * segmentSpacing
      : window.innerWidth + i * segmentSpacing;

    img.y = yBase;
    container.appendChild(img);

    snake.segments.push({ img, x: img.x, y: img.y });
  }

  return snake;
}

for (let i = 0; i < snakeCount; i++) {
  const direction = i % 2 === 0 ? 1 : -1;
  snakes.push(createSnake(80 + i * rowSpacing, direction));
}

function animate() {
  snakes.forEach(snake => {
    snake.phase += waveSpeed;

    const head = snake.segments[0];
    head.x += snake.direction * speed;
    head.y += Math.sin(snake.phase) * 0.6;

    if (snake.direction === 1 && head.x > window.innerWidth + 60) {
      head.x = -60;
    }
    if (snake.direction === -1 && head.x < -60) {
      head.x = window.innerWidth + 60;
    }

    for (let i = 1; i < snake.segments.length; i++) {
      const prev = snake.segments[i - 1];
      const seg = snake.segments[i];

      seg.x += (prev.x - seg.x) * 0.15;
      seg.y += (prev.y - seg.y) * 0.15;
    }

    snake.segments.forEach((seg, i) => {
      const wiggle = Math.sin(snake.phase - i * 0.5) * amplitude;
      seg.img.style.transform = `
        translate(${seg.x}px, ${seg.y + wiggle}px)
        rotate(${snake.direction === 1 ? 0 : 180}deg)
      `;
    });
  });

  requestAnimationFrame(animate);
}

animate();

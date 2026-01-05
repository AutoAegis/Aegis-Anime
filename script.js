const container = document.querySelector('.snake-container');

const imagesList = [
  'https://github.com/AutoAegis/Aegis-Anime/blob/main/Aegis%20White.png?raw=true',
  'https://github.com/AutoAegis/Aegis-Anime/blob/main/Aegis%20Org.png?raw=true',
  'https://github.com/AutoAegis/Aegis-Anime/blob/main/Aegis%20Purple.png?raw=true',
  'https://github.com/AutoAegis/Aegis-Anime/blob/main/Aegis%20Red.png?raw=true',
  'https://github.com/AutoAegis/Aegis-Anime/blob/main/Aegis%20White.png?raw=true'
];

const snakeCount = 5;
const snakeLength = 5;
const amplitude = 20;
const speed = 2;
const spinSpeed = 2;
const rowSpacing = 120;

let snakes = [];

function getRandomImage() {
  return imagesList[Math.floor(Math.random() * imagesList.length)];
}

function createSnake(yBase, direction) {
  const snake = [];
  for (let i = 0; i < snakeLength; i++) {
    const img = document.createElement('img');
    img.src = getRandomImage();
    img.classList.add('snake-image');
    img.x = direction === 1 ? -i * 60 : window.innerWidth + i * 60;
    img.yBase = yBase;
    img.direction = direction;
    img.phase = i * 0.5;
    img.rotation = Math.random() * 360;
    container.appendChild(img);
    snake.push(img);
  }
  return snake;
}

for (let i = 0; i < snakeCount; i++) {
  const direction = i % 2 === 0 ? 1 : -1;
  const yBase = i * rowSpacing + 50;
  snakes.push(createSnake(yBase, direction));
}

function animate() {
  snakes.forEach(snake => {
    snake.forEach((img, index) => {
      if (index === 0) img.x += img.direction * speed;
      else {
        const prev = snake[index - 1];
        img.x += (prev.x - img.x - img.direction * 60) * 0.1;
        img.phase += 0.05;
      }

      if (img.direction === 1 && img.x > window.innerWidth + 50) img.x = -50;
      if (img.direction === -1 && img.x < -50) img.x = window.innerWidth + 50;

      const y = img.yBase + Math.sin(img.phase) * amplitude;
      img.style.top = `${y}px`;
      img.style.transform = `translateX(${img.x}px) rotate(${img.rotation}deg)`;
      img.rotation += spinSpeed;
    });
  });

  requestAnimationFrame(animate);
}

animate();

const startButton = document.getElementById('start-button');
const mainContent = document.getElementById('main-content');
const startScreen = document.getElementById('start-screen');

startButton.addEventListener('click', () => {
  startScreen.style.display = 'none';
  mainContent.style.display = 'block';
});

// Glitter animation
const canvas = document.getElementById('glitter-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let glitter = [];

function createGlitter() {
  for (let i = 0; i < 100; i++) {
    glitter.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.5,
      d: Math.random() * 1.5
    });
  }
}

function drawGlitter() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'white';
  for (let i = 0; i < glitter.length; i++) {
    const g = glitter[i];
    ctx.beginPath();
    ctx.arc(g.x, g.y, g.r, 0, Math.PI * 2, true);
    ctx.fill();
  }
  moveGlitter();
}

function moveGlitter() {
  for (let i = 0; i < glitter.length; i++) {
    glitter[i].y += glitter[i].d;
    if (glitter[i].y > canvas.height) {
      glitter[i].y = 0;
      glitter[i].x = Math.random() * canvas.width;
    }
  }
}

createGlitter();
setInterval(drawGlitter, 33);

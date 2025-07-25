// Create twinkling stars background
const canvas = document.getElementById('stars');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

let stars = Array(200).fill().map(() => ({
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height,
  r: Math.random() * 1.5 + 0.5,
  alpha: Math.random()
}));

function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  stars.forEach(star => {
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.r, 0, 2 * Math.PI);
    ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
    ctx.fill();
    star.alpha += (Math.random() - 0.5) * 0.05;
    if (star.alpha < 0.1) star.alpha = 0.1;
    if (star.alpha > 1) star.alpha = 1;
  });
  requestAnimationFrame(drawStars);
}
drawStars();

// Handle Start button
document.addEventListener('DOMContentLoaded', () => {
  const startButton = document.querySelector('.start-button');
  if (startButton) {
    startButton.addEventListener('click', () => {
      window.location.href = "phase1.html";
    });
  }
});

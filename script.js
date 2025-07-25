// Falling stars animation
const canvas = document.getElementById('stars');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const stars = [];
for (let i = 0; i < 150; i++) {
  stars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 1.5 + 0.5,
    d: Math.random() * 0.5 + 0.2
  });
}

function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#fff";
  ctx.beginPath();
  for (let i = 0; i < stars.length; i++) {
    const s = stars[i];
    ctx.moveTo(s.x, s.y);
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2, true);
  }
  ctx.fill();
  updateStars();
}

function updateStars() {
  for (let i = 0; i < stars.length; i++) {
    const s = stars[i];
    s.y += s.d;
    if (s.y > canvas.height) {
      s.y = 0;
      s.x = Math.random() * canvas.width;
    }
  }
}

setInterval(drawStars, 33);

// Floating messages
const messages = [
  "I LOVE BRANDON BRESSLER",
  "Sierra and Brandon Forever",
  "You're My Everything",
  "I LOVE BRANDON BRESSLER",
  "I LOVE BRANDON BRESSLER",
  "I LOVE BRANDON BRESSLER"
];

messages.forEach((msg, index) => {
  const span = document.createElement("span");
  span.className = "floating-message";
  span.textContent = msg;
  span.style.left = Math.random() * 100 + "vw";
  span.style.top = Math.random() * 100 + "vh";
  span.style.animationDelay = `${index * 2}s`;
  span.style.fontSize = `${Math.random() * 20 + 20}px`;
  document.body.appendChild(span);
});

// Start button click
document.getElementById("startButton").addEventListener("click", () => {
  alert("Phase 1: Coming up next!"); // Placeholder
  // Future: showPhase1(); or window.location.href = "phase1.html";
});

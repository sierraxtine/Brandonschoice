const icons = [
  "icons/icon1.png", "icons/icon2.png", "icons/icon3.png",
  "icons/icon4.png", "icons/icon5.png", "icons/icon6.png",
  "icons/icon7.png", "icons/icon8.png", "icons/icon9.png",
  "icons/icon10.png", "icons/icon11.png", "icons/icon12.png",
  "icons/icon13.png", "icons/icon14.png", "icons/icon15.png",
  "icons/icon16.png"
];
let selectedPhase1 = [];
let selectedPhase2 = [];
let finalPick = null;
let currentPhase = 1;
function startPhase(phase) {
  document.getElementById('start-screen').classList.add('hidden');
  document.getElementById('game-phase').classList.remove('hidden');
  currentPhase = phase;
  renderIcons();
}
function renderIcons() {
  const grid = document.getElementById('icon-grid');
  grid.innerHTML = '';
  document.getElementById('phase-title').textContent =
    currentPhase === 1 ? "Phase 1: Brandon is Hot 🔥" :
    currentPhase === 2 ? "Phase 2: Brandon is Beautiful ✨" :
    "Phase 3: Brandon is Cute 💖";
  const iconList = currentPhase === 1 ? icons :
                   currentPhase === 2 ? selectedPhase1 :
                   selectedPhase2;
  iconList.forEach(src => {
    const img = document.createElement('img');
    img.src = src;
    img.onclick = () => toggleSelection(img, src);
    grid.appendChild(img);
  });
}
function toggleSelection(img, src) {
  img.classList.toggle('selected');
  if (currentPhase === 1) {
    selectedPhase1.includes(src)
      ? selectedPhase1 = selectedPhase1.filter(i => i !== src)
      : selectedPhase1.push(src);
  } else if (currentPhase === 2) {
    selectedPhase2.includes(src)
      ? selectedPhase2 = selectedPhase2.filter(i => i !== src)
      : selectedPhase2.push(src);
  } else if (currentPhase === 3) {
    finalPick = src;
    document.querySelectorAll('#icon-grid img').forEach(i => i.classList.remove('selected'));
    img.classList.add('selected');
  }
}
function nextPhase() {
  if (currentPhase === 1 && selectedPhase1.length >= 6) {
    currentPhase = 2;
    renderIcons();
  } else if (currentPhase === 2 && selectedPhase2.length === 3) {
    currentPhase = 3;
    renderIcons();
    document.getElementById('next-button').textContent = 'Reveal Final Pick 🎁';
  } else if (currentPhase === 3 && finalPick) {
    showFinal();
  } else {
    alert("Please select the required number of icons.");
  }
}
function showFinal() {
  document.getElementById('game-phase').classList.add('hidden');
  document.getElementById('result-screen').classList.remove('hidden');
  document.getElementById('final-pick').src = finalPick;
  launchConfetti();
}
function sendToSierra() {
  const mailto = `mailto:sierraxtine@gmail.com?subject=Brandon's JADE Icon Pick&body=Final icon chosen: ${finalPick}`;
  window.location.href = mailto;
}
function launchConfetti() {
  const duration = 2000;
  const animationEnd = Date.now() + duration;
  const canvas = document.getElementById('confetti');
  const context = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const confetti = [];
  for (let i = 0; i < 300; i++) {
    confetti.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      r: Math.random() * 6 + 2,
      d: Math.random() * duration,
      color: `hsl(${Math.random() * 360}, 100%, 70%)`
    });
  }
  function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    confetti.forEach(p => {
      context.beginPath();
      context.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      context.fillStyle = p.color;
      context.fill();
    });
  }
  function update() {
    confetti.forEach(p => {
      p.y += 4;
      if (p.y > canvas.height) {
        p.y = -10;
        p.x = Math.random() * canvas.width;
      }
    });
  }
  function animate() {
    if (Date.now() > animationEnd) return;
    draw();
    update();
    requestAnimationFrame(animate);
  }
  animate();
}
let previewedSrc = null;
let previewedImg = null;

function renderIcons() {
  const grid = document.getElementById('icon-grid');
  grid.innerHTML = '';
  document.getElementById('phase-title').textContent =
    currentPhase === 1 ? "Phase 1: Brandon is Hot 🔥" :
    currentPhase === 2 ? "Phase 2: Brandon is Beautiful ✨" :
    "Phase 3: Brandon is Cute 💖";

  const iconList = currentPhase === 1 ? icons :
                   currentPhase === 2 ? selectedPhase1 :
                   selectedPhase2;

  iconList.forEach(src => {
    const img = document.createElement('img');
    img.src = src;
    img.onclick = () => previewIcon(img, src);
    if ((currentPhase === 1 && selectedPhase1.includes(src)) ||
        (currentPhase === 2 && selectedPhase2.includes(src)) ||
        (currentPhase === 3 && finalPick === src)) {
      img.classList.add("selected");
    }
    grid.appendChild(img);
  });
}

function previewIcon(img, src) {
  previewedSrc = src;
  previewedImg = img;
  document.getElementById('preview-img').src = src;
  document.getElementById('preview-modal').classList.remove('hidden');
}

function confirmSelection() {
  toggleSelection(previewedImg, previewedSrc);
  closePreview();
}

function closePreview() {
  document.getElementById('preview-modal').classList.add('hidden');
}

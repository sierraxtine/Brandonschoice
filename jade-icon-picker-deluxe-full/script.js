
const startBtn = document.getElementById('start-button');
const startScreen = document.getElementById('start-screen');
const app = document.getElementById('main-app');
const gallery = document.getElementById('gallery');
const nextPhase = document.getElementById('next-phase');
const phaseTitle = document.getElementById('phase-title');
const finalScreen = document.getElementById('final-screen');
const finalImages = document.getElementById('final-images');
const sendForm = document.getElementById('send-form');
const sendStatus = document.getElementById('send-status');
const previewModal = document.getElementById('preview-modal');
const previewImage = document.getElementById('preview-image');
const closePreview = document.getElementById('close-preview');

let phase = 1;
let selected = [];

startBtn.onclick = () => {
  startScreen.style.display = 'none';
  app.style.display = 'block';
  loadImages();
};

function loadImages() {
  gallery.innerHTML = '';
  for (let i = 1; i <= 16; i++) {
    const img = document.createElement('img');
    img.src = `icon${i}.png`;
    img.onclick = () => toggleSelect(img, i);
    img.oncontextmenu = (e) => {
      e.preventDefault();
      showPreview(`icon${i}.png`);
    };
    gallery.appendChild(img);
  }
}

function toggleSelect(img, id) {
  const idx = selected.indexOf(id);
  if (idx > -1) {
    selected.splice(idx, 1);
    img.classList.remove('selected');
  } else {
    const limit = phase === 1 ? 10 : phase === 2 ? 5 : 3;
    if (selected.length < limit) {
      selected.push(id);
      img.classList.add('selected');
    }
  }
}

nextPhase.onclick = () => {
  if ((phase === 1 && selected.length !== 10) ||
      (phase === 2 && selected.length !== 5) ||
      (phase === 3 && selected.length !== 3)) {
    alert('Please select the correct number of icons.');
    return;
  }

  if (phase === 3) {
    app.style.display = 'none';
    finalScreen.style.display = 'block';
    document.getElementById('email-message').value = `Final picks: ${selected.join(', ')}`;
    finalImages.innerHTML = selected.map(id => `<img src='icon${id}.png' height='100' />`).join('');
    return;
  }

  phase++;
  phaseTitle.textContent = `Phase ${phase}: Select Your Top ${phase === 2 ? 5 : 3}`;
  selected = [];
  loadImages();
};

sendForm.onsubmit = function(e) {
  e.preventDefault();
  emailjs.sendForm('service_xxx', 'template_xxx', this)
    .then(() => sendStatus.innerText = 'Sent successfully!')
    .catch(() => sendStatus.innerText = 'Error sending.');
};

function showPreview(src) {
  previewImage.src = src;
  previewModal.style.display = 'flex';
}

closePreview.onclick = () => {
  previewModal.style.display = 'none';
};

const startBtn = document.getElementById('start-button');
const phase1 = document.getElementById('phase1');
const phase2 = document.getElementById('phase2');
const phase3 = document.getElementById('phase3');
const finalScreen = document.getElementById('final-screen');
const previewModal = document.getElementById('preview-modal');
const previewImage = document.getElementById('preview-image');
const closePreview = document.querySelector('.close-preview');

const iconCount = 16;
let selectedPhase1 = {};
let selectedPhase2 = {};
let selectedPhase3 = {};

const createIconCard = (phase, container, limit, selectedMap, nextPhaseBtn) => {
  container.innerHTML = '';
  for (let i = 1; i <= iconCount; i++) {
    const card = document.createElement('div');
    card.className = 'icon-card';

    const img = document.createElement('img');
    img.src = `icon${i}.png`;
    img.alt = `Icon ${i}`;
    img.onclick = () => {
      previewImage.src = img.src;
      previewModal.classList.remove('hidden');
    };

    const select = document.createElement('select');
    select.innerHTML = `<option value="">Rank</option>`;
    for (let r = 1; r <= limit; r++) {
      select.innerHTML += `<option value="${r}">${r}</option>`;
    }

    select.onchange = () => {
      const value = select.value;
      // Reset any conflicting ranks
      Object.keys(selectedMap).forEach(k => {
        if (selectedMap[k] === value) {
          delete selectedMap[k];
          const existing = container.querySelector(`#select-${k}`);
          if (existing) existing.value = '';
        }
      });

      if (value) {
        selectedMap[i] = value;
      } else {
        delete selectedMap[i];
      }

      select.id = `select-${i}`;

      // Enable next button if enough are selected
      nextPhaseBtn.disabled = Object.keys(selectedMap).length !== limit;
    };

    card.appendChild(img);
    card.appendChild(select);
    container.appendChild(card);
  }
};

startBtn.onclick = () => {
  document.getElementById('start-screen').classList.add('hidden');
  phase1.classList.remove('hidden');
  createIconCard(1, document.getElementById('icons-container-1'), 10, selectedPhase1, document.getElementById('next-to-phase2'));
};

document.getElementById('next-to-phase2').onclick = () => {
  phase1.classList.add('hidden');
  phase2.classList.remove('hidden');
  createIconCard(2, document.getElementById('icons-container-2'), 5, selectedPhase2, document.getElementById('next-to-phase3'));
};

document.getElementById('next-to-phase3').onclick = () => {
  phase2.classList.add('hidden');
  phase3.classList.remove('hidden');
  createIconCard(3, document.getElementById('icons-container-3'), 3, selectedPhase3, document.getElementById('submit-selection'));
};

document.getElementById('submit-selection').onclick = () => {
  const results = {
    phase1: selectedPhase1,
    phase2: selectedPhase2,
    phase3: selectedPhase3,
  };

  // Simulate email submission
  console.log('Sending results to Sierra:', results);

  // Show final screen
  phase3.classList.add('hidden');
  finalScreen.classList.remove('hidden');
};

closePreview.onclick = () => {
  previewModal.classList.add('hidden');
  previewImage.src = '';
};

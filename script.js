const icons = Array.from({ length: 16 }, (_, i) => `icon${i + 1}.png`);

let selectedPhase1 = [];
let selectedPhase2 = [];
let selectedPhase3 = [];

const startBtn = document.getElementById("start-button");
const phase1 = document.getElementById("phase1");
const phase2 = document.getElementById("phase2");
const phase3 = document.getElementById("phase3");
const finalScreen = document.getElementById("final-screen");
const startScreen = document.getElementById("start-screen");
const previewModal = document.getElementById("preview-modal");
const previewImage = document.getElementById("preview-image");
const closePreview = document.querySelector(".close-preview");

function createIconCard(phase, container, limit, selections, nextBtn) {
  container.innerHTML = "";

  icons.forEach((src) => {
    const card = document.createElement("div");
    card.className = "icon-card";

    const img = document.createElement("img");
    img.src = src;
    img.alt = src;

    img.onclick = () => {
      previewImage.src = src;
      previewModal.classList.remove("hidden");
    };

    const select = document.createElement("select");
    select.disabled = true;
    for (let i = 0; i <= limit; i++) {
      const option = document.createElement("option");
      option.value = i;
      option.text = i === 0 ? "Not Selected" : `Rank ${i}`;
      select.appendChild(option);
    }

    select.onchange = () => {
      const val = parseInt(select.value);
      const found = selections.find((s) => s.src === src);

      if (val === 0) {
        if (found) selections.splice(selections.indexOf(found), 1);
        select.disabled = false;
      } else {
        if (!found && selections.length < limit) {
          selections.push({ src, rank: val });
        } else if (found) {
          found.rank = val;
        }
      }
    };

    card.appendChild(img);
    card.appendChild(select);
    container.appendChild(card);
  });

  nextBtn.onclick = () => {
    if (selections.length !== limit) {
      alert(`Please rank exactly ${limit} icons.`);
      return;
    }

    // sort by rank
    selections.sort((a, b) => a.rank - b.rank);

    if (phase === 1) {
      phase1.classList.add("hidden");
      phase2.classList.remove("hidden");
      createIconCard(2, document.getElementById("icons-container-2"), 5, selectedPhase2, document.getElementById("next-to-phase3"));
    } else if (phase === 2) {
      phase2.classList.add("hidden");
      phase3.classList.remove("hidden");
      createIconCard(3, document.getElementById("icons-container-3"), 3, selectedPhase3, document.getElementById("submit-selection"));
    }
  };
}

startBtn.onclick = () => {
  startScreen.classList.add("hidden");
  phase1.classList.remove("hidden");
  createIconCard(1, document.getElementById("icons-container-1"), 10, selectedPhase1, document.getElementById("next-to-phase2"));
};

document.getElementById("submit-selection").onclick = () => {
  if (selectedPhase3.length !== 3) {
    alert("Please rank exactly 3 icons.");
    return;
  }

  const finalRanks = selectedPhase3
    .sort((a, b) => a.rank - b.rank)
    .map((s, i) => `${i + 1}. ${s.src}`)
    .join("\n");

  const mailtoLink = `mailto:sierraxtine@gmail.com?subject=Brandon's JADE Icon Picks&body=Here are my final 3 picks:\n\n${finalRanks}`;
  window.location.href = mailtoLink;

  phase3.classList.add("hidden");
  finalScreen.classList.remove("hidden");
};

closePreview.onclick = () => {
  previewModal.classList.add("hidden");
  previewImage.src = "";
};

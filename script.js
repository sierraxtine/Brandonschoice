document.addEventListener("DOMContentLoaded", () => {
  const startBtn = document.getElementById("start-btn");
  const screens = document.querySelectorAll(".screen");
  const modal = document.getElementById("preview-modal");
  const previewImg = document.getElementById("preview-img");
  const closePreview = document.getElementById("close-preview");

  const phases = ["phase1", "phase2", "phase3"];
  let currentPhase = 0;
  let selections = [[], [], []];

  const imageCount = 16;
  const iconPath = "icons/icon";

  function showScreen(id) {
    screens.forEach(screen => screen.classList.add("hidden"));
    document.getElementById(id).classList.remove("hidden");
  }

  function renderGrid(phaseIndex) {
    const gridId = "grid" + (phaseIndex + 1);
    const grid = document.getElementById(gridId);
    grid.innerHTML = "";

    const maxSelect = [10, 5, 3][phaseIndex];
    for (let i = 1; i <= imageCount; i++) {
      const card = document.createElement("div");
      card.className = "icon-card";

      const img = document.createElement("img");
      img.src = `${iconPath}${i}.png`;
      img.alt = `Icon ${i}`;
      img.addEventListener("click", () => {
        previewImg.src = img.src;
        modal.classList.remove("hidden");
      });

      const select = document.createElement("select");
      const blank = document.createElement("option");
      blank.value = "";
      blank.text = "Rank";
      select.appendChild(blank);
      for (let j = 1; j <= maxSelect; j++) {
        const opt = document.createElement("option");
        opt.value = j;
        opt.text = j;
        select.appendChild(opt);
      }
      select.addEventListener("change", () => {
        selections[phaseIndex] = selections[phaseIndex].filter(s => s.img !== img.src);
        if (select.value) {
          selections[phaseIndex].push({ img: img.src, rank: parseInt(select.value) });
        }
      });

      card.appendChild(img);
      card.appendChild(select);
      grid.appendChild(card);
    }
  }

  startBtn.addEventListener("click", () => {
    currentPhase = 0;
    showScreen(phases[currentPhase]);
    renderGrid(currentPhase);
  });

  document.getElementById("next1").addEventListener("click", () => {
    currentPhase = 1;
    showScreen(phases[currentPhase]);
    renderGrid(currentPhase);
  });

  document.getElementById("next2").addEventListener("click", () => {
    currentPhase = 2;
    showScreen(phases[currentPhase]);
    renderGrid(currentPhase);
  });

  document.getElementById("finish").addEventListener("click", () => {
    showScreen("final-screen");
  });

  closePreview.addEventListener("click", () => {
    modal.classList.add("hidden");
  });
});

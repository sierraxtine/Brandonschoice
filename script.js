let currentPhase = 0;
const maxSelections = [10, 5, 3];
let selectedIcons = [];
let allIcons = [];
let finalSelection = [];

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("start-button").addEventListener("click", startPicker);
  document.getElementById("close-preview").addEventListener("click", () => {
    document.getElementById("preview-modal").style.display = "none";
  });
  loadIcons();
});

function startPicker() {
  document.getElementById("start-screen").classList.add("hidden");
  showPhase();
}

function loadIcons() {
  for (let i = 1; i <= 16; i++) {
    allIcons.push(`icons/icon${i}.png`);
  }
}

function showPhase() {
  clearGrid();
  selectedIcons = [];
  document.getElementById("phase-screen").classList.remove("hidden");
  document.getElementById("phase-title").innerText = `Phase ${currentPhase + 1}: Pick Your Top ${maxSelections[currentPhase]}`;

  const grid = document.getElementById("icons-grid");
  let iconsToShow = allIcons;

  // Filter icons based on the previous selection
  if (currentPhase > 0) {
    iconsToShow = finalSelection.map(item => item.src);
  }

  iconsToShow.forEach((src, index) => {
    const tile = document.createElement("div");
    tile.className = "icon-tile";

    const img = document.createElement("img");
    img.src = src;
    img.alt = `Icon ${index + 1}`;
    img.onclick = () => openPreview(src);

    const dropdown = document.createElement("select");
    const noneOption = document.createElement("option");
    noneOption.value = "";
    noneOption.text = "-- Rank --";
    dropdown.appendChild(noneOption);

    for (let i = 1; i <= maxSelections[currentPhase]; i++) {
      const option = document.createElement("option");
      option.value = i;
      option.text = i;
      dropdown.appendChild(option);
    }

    dropdown.addEventListener("change", () => {
      const existing = selectedIcons.find(item => item.src === src);
      if (existing) {
        existing.rank = parseInt(dropdown.value);
      } else {
        selectedIcons.push({ src, rank: parseInt(dropdown.value) });
      }
      // Remove if empty
      if (!dropdown.value) {
        selectedIcons = selectedIcons.filter(item => item.src !== src);
      }
    });

    tile.appendChild(img);
    tile.appendChild(dropdown);
    grid.appendChild(tile);
  });

  const nextButton = document.createElement("button");
  nextButton.className = "neon";
  nextButton.innerText = currentPhase === 2 ? "Send to Sierra" : "Next Phase";
  nextButton.onclick = () => nextPhase();
  grid.appendChild(nextButton);
}

function openPreview(src) {
  const modal = document.getElementById("preview-modal");
  const previewImage = document.getElementById("preview-image");
  previewImage.src = src;
  modal.style.display = "flex";
}

function clearGrid() {
  const grid = document.getElementById("icons-grid");
  while (grid.firstChild) {
    grid.removeChild(grid.firstChild);
  }
}

function nextPhase() {
  if (selectedIcons.length !== maxSelections[currentPhase]) {
    alert(`Please select and rank exactly ${maxSelections[currentPhase]} icons.`);
    return;
  }

  // Sort and keep only selected icons
  finalSelection = [...selectedIcons].sort((a, b) => a.rank - b.rank);

  if (currentPhase === 2) {
    showFinalScreen();
  } else {
    currentPhase++;
    showPhase();
  }
}

function showFinalScreen() {
  document.getElementById("phase-screen").classList.add("hidden");
  document.getElementById("final-screen").classList.remove("hidden");

  const resultsDiv = document.getElementById("final-results");
  resultsDiv.innerHTML = "";

  finalSelection.forEach((item, idx) => {
    const result = document.createElement("p");
    result.innerText = `#${idx + 1} - ${item.src}`;
    resultsDiv.appendChild(result);
  });

  const sendBtn = document.getElementById("send-button");
  sendBtn.onclick = () => {
    const resultText = finalSelection.map((item, idx) => `#${idx + 1}: ${item.src}`).join("\n");
    const mailto = `mailto:sierraxtine@gmail.com?subject=Brandon's JADE Icon Picks&body=${encodeURIComponent(resultText)}`;
    window.location.href = mailto;
    document.getElementById("send-status").innerText = "Sent to Sierra!";
  };
}

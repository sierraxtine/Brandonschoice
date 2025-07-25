const allIcons = Array.from({ length: 16 }, (_, i) => `icons/icon${i + 1}.png`);

let currentPhase = 1;
let selections = {};
const maxSelections = { 1: 10, 2: 5, 3: 3 };

// 🎬 Start Button Logic
function startPicker() {
  document.getElementById("start-screen").style.display = "none";
  loadPhase();
}

// 🔁 Load Icons Per Phase
function loadPhase() {
  const container = document.getElementById("phase-container");
  container.innerHTML = `
    <h2>Phase ${currentPhase}: Select Your Top ${maxSelections[currentPhase]}</h2>
    <div id="icons-grid" class="grid"></div>
    <button class="next-btn" onclick="nextPhase()">Next</button>
  `;
  container.style.display = "block";

  const iconGrid = document.getElementById("icons-grid");
  iconGrid.innerHTML = "";

  const pool = currentPhase === 1 ? allIcons
             : currentPhase === 2 ? selections[1].map(s => s.image)
             : selections[2].map(s => s.image);

  pool.forEach((imgSrc, index) => {
    const wrapper = document.createElement("div");
    wrapper.className = "icon-wrapper";

    const img = document.createElement("img");
    img.src = imgSrc;
    img.alt = `Icon ${index + 1}`;
    img.className = "icon-img";
    img.onclick = () => showPreview(imgSrc);

    const select = document.createElement("select");
    select.innerHTML = `<option value="">Rank</option>` +
      Array.from({ length: maxSelections[currentPhase] }, (_, i) => 
        `<option value="${i + 1}">${i + 1}</option>`).join("");
    select.onchange = () => handleSelect(imgSrc, select.value);

    wrapper.appendChild(img);
    wrapper.appendChild(select);
    iconGrid.appendChild(wrapper);
  });

  selections[currentPhase] = [];
}

// 🪞 Show Preview
function showPreview(src) {
  document.getElementById("preview-image").src = src;
  document.getElementById("preview-modal").classList.remove("hidden");
}

document.getElementById("close-preview").onclick = () => {
  document.getElementById("preview-modal").classList.add("hidden");
};

// 🧠 Track User Selections
function handleSelect(imgSrc, rank) {
  const phaseList = selections[currentPhase];
  const existing = phaseList.find(s => s.rank === rank);
  if (existing) {
    existing.rank = ""; // clear conflicting rank
  }

  // Remove any previous entry for this image
  const filtered = phaseList.filter(s => s.image !== imgSrc);
  filtered.push({ image: imgSrc, rank });
  selections[currentPhase] = filtered;
}

// ⏭️ Move to Next Phase
function nextPhase() {
  if ((selections[currentPhase]?.length || 0) < maxSelections[currentPhase]) {
    alert(`Please select and rank ${maxSelections[currentPhase]} icons.`);
    return;
  }

  if (currentPhase === 3) {
    showFinalScreen();
    return;
  }

  currentPhase++;
  loadPhase();
}

// 💌 Final Submission
function showFinalScreen() {
  document.getElementById("phase-container").style.display = "none";
  const final = document.getElementById("final-screen");
  final.classList.remove("hidden");

  const resultDiv = document.getElementById("final-results");
  resultDiv.innerHTML = "<h3>Your Top 3 Picks:</h3>";
  selections[3]
    .sort((a, b) => a.rank - b.rank)
    .forEach(s => {
      const img = document.createElement("img");
      img.src = s.image;
      img.className = "icon-img small";
      resultDiv.appendChild(img);
    });

  document.getElementById("send-button").onclick = () => {
    const picks = selections[3]
      .sort((a, b) => a.rank - b.rank)
      .map(s => `${s.rank}. ${s.image}`)
      .join("%0A");
    const mailtoLink = `mailto:sierraxtine@gmail.com?subject=Brandon's JADE Icon Picks&body=${picks}`;
    window.location.href = mailtoLink;
  };
}

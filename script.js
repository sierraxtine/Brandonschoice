let phase = 1;
let maxSelections = 10;
let selectedIcons = [];

function startGame() {
  document.getElementById("start-screen").classList.add("hidden");
  document.getElementById("game-screen").classList.remove("hidden");
  loadIcons();
}

function loadIcons() {
  const container = document.getElementById("icon-grid");
  container.innerHTML = "";
  for (let i = 1; i <= 16; i++) {
    const box = document.createElement("div");
    box.className = "icon-box";
    const img = document.createElement("img");
    img.src = `icons/icon${i}.png`;
    img.alt = `Icon ${i}`;
    img.onclick = () => toggleSelection(box, i);
    const select = document.createElement("select");
    for (let j = 1; j <= 16; j++) {
      const option = document.createElement("option");
      option.value = j;
      option.textContent = j;
      select.appendChild(option);
    }
    box.appendChild(img);
    box.appendChild(select);
    container.appendChild(box);
  }
}

function toggleSelection(box, index) {
  if (box.classList.contains("selected")) {
    box.classList.remove("selected");
    selectedIcons = selectedIcons.filter(i => i !== index);
  } else {
    if (selectedIcons.length < maxSelections) {
      box.classList.add("selected");
      selectedIcons.push(index);
    } else {
      alert(`You can only pick your top ${maxSelections} icons.`);
    }
  }
}

function nextPhase() {
  if (selectedIcons.length !== maxSelections) {
    alert(`Please select exactly ${maxSelections} icons.`);
    return;
  }
  if (phase === 3) {
    document.getElementById("game-screen").classList.add("hidden");
    document.getElementById("final-screen").classList.remove("hidden");
    return;
  }
  phase++;
  maxSelections = phase === 2 ? 5 : 3;
  selectedIcons = [];
  document.getElementById("phase-title").textContent = 
    phase === 2 ? "Phase 2: Select Your Top 5 Icons" : "Final Phase: Top 3 Icons";
  loadIcons();
}

function sendToSierra() {
  alert("Final selection sent to sierraxtine@gmail.com 💌");
}

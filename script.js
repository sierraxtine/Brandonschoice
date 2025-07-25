function startPicker() {
  alert("This will take you to Phase 1!");
  // Later: window.location.href = "phase1.html";
}

// Floating messages
const messages = [
  "I LOVE BRANDON BRESSLER",
  "Sierra and Brandon Forever",
  "You're My Everything"
];

const colors = ["#ff00ff", "#00ffff", "#ff9900", "#00ff99", "#ffff00", "#ff3399", "#3399ff", "#cc00ff"];
const container = document.getElementById("floatingMessagesContainer");

function createFloatingMessage() {
  const msg = document.createElement("div");
  msg.classList.add("floating-message");
  msg.innerText = messages[Math.floor(Math.random() * messages.length)];
  msg.style.color = colors[Math.floor(Math.random() * colors.length)];
  msg.style.left = Math.random() * 100 + "vw";
  msg.style.top = Math.random() * 100 + "vh";
  msg.style.fontSize = (Math.random() * 1.5 + 1) + "rem";
  msg.style.transform = `rotate(${Math.random() * 360}deg)`;
  msg.style.animationDuration = `${10 + Math.random() * 10}s`;

  container.appendChild(msg);

  // Remove after animation
  setTimeout(() => msg.remove(), 25000);
}

// Fill screen with messages
setInterval(createFloatingMessage, 300);

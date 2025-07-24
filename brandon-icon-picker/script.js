const images = [
  "7.png", "8.png", "9.png", "10.png", "11.png", "12.png", "13.png", "14.png", "16.png", "17.png",
  "FINAL JADE LOGO.png", "JADE_Pro.CANVA.png", "Screenshot 2025-07-21 at 3.56.41 PM.png",
  "Screenshot 2025-07-21 at 3.59.08 PM.png", "Screenshot 2025-07-21 at 4.02.30 PM.png"
];

const gallery = document.getElementById("gallery");

images.forEach(img => {
  const image = document.createElement("img");
  image.src = "images/" + img;
  image.alt = img;
  image.onclick = () => {
    alert(`Vote for "${img}" recorded!
Email sent to sierraxtine@gmail.com ✉️`);
  };
  gallery.appendChild(image);
});

    const noBtn = document.getElementById("no");
const yesBtn = document.getElementById("yes");
const area = document.getElementById("area");
const mainCard = document.getElementById("main");

const dangerRadius = 70;

// Desktop mouse
area.addEventListener("mousemove", (e) => {
  escapeNo(e.clientX, e.clientY);
});

// Mobile touch
area.addEventListener("touchstart", (e) => {
  const t = e.touches[0];
  escapeNo(t.clientX, t.clientY);
});

area.addEventListener("touchmove", (e) => {
  const t = e.touches[0];
  escapeNo(t.clientX, t.clientY);
});

// Prevent NO click
noBtn.addEventListener("click", (e) => {
  e.preventDefault();
  moveNoButton();
});

function escapeNo(x, y) {
  const rect = noBtn.getBoundingClientRect();
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;

  const dx = x - cx;
  const dy = y - cy;
  const dist = Math.hypot(dx, dy);

  if (dist < dangerRadius) {
    moveNoButton();
  }
}

function moveNoButton() {
  const maxX = area.clientWidth - noBtn.offsetWidth;
  const maxY = area.clientHeight - noBtn.offsetHeight;

  let x, y;
  do {
    x = Math.random() * maxX;
    y = Math.random() * maxY;
  } while (x < 120 && y > 40 && y < 100); // avoid YES area

  noBtn.style.left = x + "px";
  noBtn.style.top = y + "px";
}

// YES click → show GIF
yesBtn.addEventListener("click", () => {
  mainCard.innerHTML = `
    <p style="font-size: 1.8rem; margin-bottom: 15px;">
       Ha! You really thought you had a choice? 😏
    </p>

    <img 
      src="https://media1.tenor.com/m/Jdp2638EQ8sAAAAd/sance-money.gif"
      style="width: 100%; max-width: 300px; border-radius: 20px;"
    />

    <p style="font-size: 1.8rem; margin-top: 15px;">
       Kannamma 💖
    </p>
  `;
});
// Adjust NO initial position based on container width
function placeNoInitial() {
  const areaWidth = area.clientWidth;
  noBtn.style.left = Math.min(0.6 * areaWidth, areaWidth - noBtn.offsetWidth) + "px";
  noBtn.style.top = "50%";
  noBtn.style.transform = "translateY(-50%)";
}

placeNoInitial();

function moveNoButton() {
  const maxX = area.clientWidth - noBtn.offsetWidth;
  const maxY = area.clientHeight - noBtn.offsetHeight;

  let x, y;
  do {
    x = Math.random() * maxX;
    y = Math.random() * maxY;
  } while (
    // avoid YES area (~first 40% of container)
    x < 0.4 * area.clientWidth &&
    y > 0.3 * area.clientHeight &&
    y < 0.7 * area.clientHeight
  );

  noBtn.style.left = x + "px";
  noBtn.style.top = y + "px";
}
function launchConfetti(count = 50) {
  const confettiContainer = document.getElementById("confetti");
  for (let i = 0; i < count; i++) {
    const confetti = document.createElement("div");
    confetti.classList.add("confetti");
    
    // Random starting position
    confetti.style.left = Math.random() * 100 + "vw";
    confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 70%, 60%)`;
    
    // Random size
    confetti.style.width = (5 + Math.random() * 8) + "px";
    confetti.style.height = (8 + Math.random() * 15) + "px";
    
    // Random animation duration
    confetti.style.animationDuration = (2 + Math.random() * 2) + "s";
    
    confettiContainer.appendChild(confetti);
    
    // Remove confetti after animation
    setTimeout(() => {
      confetti.remove();
    }, 3000);
  }
}

yesBtn.addEventListener("click", () => {
  mainCard.innerHTML = `
    <p style="font-size: 1.8rem; margin-bottom: 15px;">
       Ha! Niku inko choice ledhu 😏😅💖
    </p>

    <img 
      src="https://media1.tenor.com/m/Jdp2638EQ8sAAAAd/sance-money.gif"
      style="width: 100%; max-width: 300px; border-radius: 20px;"
    />

    <p style="font-size: 1.8rem; margin-top: 15px;">
      Kannamma 💕
    </p>
  `;

  launchConfetti(70); // launch 70 pieces of confetti
});

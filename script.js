/* ===== ROMANTIC TULIP WEBSITE - script.js ===== */

// ---- Audio ----
const audioStart = document.getElementById('audio-start');
const audioFinal = document.getElementById('audio-final');

function startMusic() {
  audioStart.volume = 0.75;
  audioStart.play().catch(() => {});
}

function switchToFinalMusic() {
  audioStart.pause();
  audioStart.currentTime = 0;
  audioFinal.volume = 0.75;
  audioFinal.currentTime = 55;
  audioFinal.play().catch(() => {});
}

// Attempt to play on first interaction
let musicStarted = false;
function tryStartMusic() {
  if (!musicStarted) {
    musicStarted = true;
    startMusic();
  }
}
document.addEventListener('click', tryStartMusic, { once: false });
document.addEventListener('touchstart', tryStartMusic, { once: false });

// ---- Loading Screen ----
window.addEventListener('load', () => {
  setTimeout(() => {
    const ls = document.getElementById('loading-screen');
    ls.classList.add('hidden');
    tryStartMusic();
  }, 2800);
});

// ---- Cursor Glow ----
const cursorGlow = document.getElementById('cursor-glow');
document.addEventListener('mousemove', e => {
  cursorGlow.style.left = e.clientX + 'px';
  cursorGlow.style.top  = e.clientY + 'px';
  spawnTouchSparkle(e.clientX, e.clientY);
});
document.addEventListener('touchmove', e => {
  const t = e.touches[0];
  cursorGlow.style.left = t.clientX + 'px';
  cursorGlow.style.top  = t.clientY + 'px';
  spawnTouchSparkle(t.clientX, t.clientY);
}, { passive: true });

// ---- Touch / Click Sparkles ----
const sparkleEmojis = ['✨', '💫', '⭐', '🌸', '💕', '🌷'];
let lastSparkle = 0;
function spawnTouchSparkle(x, y) {
  const now = Date.now();
  if (now - lastSparkle < 80) return;
  lastSparkle = now;
  const el = document.createElement('div');
  el.className = 'sparkle';
  el.textContent = sparkleEmojis[Math.floor(Math.random() * sparkleEmojis.length)];
  el.style.left = (x + (Math.random() * 20 - 10)) + 'px';
  el.style.top  = (y + (Math.random() * 20 - 10)) + 'px';
  document.getElementById('sparkles-container').appendChild(el);
  setTimeout(() => el.remove(), 900);
}

document.addEventListener('click', e => {
  for (let i = 0; i < 5; i++) spawnTouchSparkle(e.clientX + Math.random() * 30 - 15, e.clientY + Math.random() * 30 - 15);
});

// ---- Floating Petals ----
const petalEmojis = ['🌸', '🌷', '🌺', '💮', '🏵️'];
function spawnPetal() {
  const el = document.createElement('div');
  el.className = 'petal-float';
  el.textContent = petalEmojis[Math.floor(Math.random() * petalEmojis.length)];
  el.style.left = Math.random() * 100 + 'vw';
  const dur = 7 + Math.random() * 8;
  el.style.animationDuration = dur + 's';
  el.style.animationDelay = -(Math.random() * dur) + 's';
  el.style.fontSize = (0.9 + Math.random() * 0.8) + 'rem';
  document.getElementById('petals-container').appendChild(el);
  setTimeout(() => el.remove(), (dur + 2) * 1000);
}
setInterval(spawnPetal, 900);
for (let i = 0; i < 8; i++) setTimeout(spawnPetal, i * 200);

// ---- Floating Hearts ----
const heartEmojis = ['❤️', '💕', '💖', '💗', '💓', '💝'];
function spawnHeart() {
  const el = document.createElement('div');
  el.className = 'heart-float';
  el.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
  el.style.left = Math.random() * 100 + 'vw';
  const dur = 6 + Math.random() * 7;
  el.style.animationDuration = dur + 's';
  el.style.animationDelay = '0s';
  el.style.fontSize = (0.8 + Math.random() * 0.7) + 'rem';
  document.getElementById('hearts-container').appendChild(el);
  setTimeout(() => el.remove(), (dur + 1) * 1000);
}
setInterval(spawnHeart, 1100);
for (let i = 0; i < 6; i++) setTimeout(spawnHeart, i * 300);

// ---- Page Transitions ----
let currentPage = 'page-proposal';

function showPage(id) {
  document.getElementById(currentPage).classList.remove('active');
  currentPage = id;
  const target = document.getElementById(id);
  target.classList.add('active');
  // Re-trigger typewriter animation
  const tw = target.querySelector('.typewriter');
  if (tw) {
    tw.style.animation = 'none';
    tw.offsetHeight; // reflow
    tw.style.animation = '';
  }
}

// ---- Page Flow Functions ----
function handleNoProposal() {
  const noBtn = document.getElementById('btn-no-proposal');
  if (noBtn) noBtn.remove();
  showPage('page-noback');
}

function goToLove() {
  showPage('page-love');
}

function goToFood() {
  showPage('page-food');
}

function goToMarriage() {
  showPage('page-marriage');
}

function handleNoMarriage() {
  const noBtn = document.getElementById('btn-no-marry');
  if (noBtn) noBtn.remove();
  showPage('page-notoption');
}

function goToFinal() {
  showPage('page-final');
  switchToFinalMusic();
  startFinalEffects();
}

// ---- Final Page Effects ----
function startFinalEffects() {
  // Heart confetti
  const confettiEmojis = ['❤️', '💕', '💖', '💗', '💝', '🌷', '🌸', '✨', '💫'];
  let count = 0;
  const confettiInterval = setInterval(() => {
    for (let i = 0; i < 4; i++) {
      const el = document.createElement('div');
      el.className = 'confetti-heart';
      el.textContent = confettiEmojis[Math.floor(Math.random() * confettiEmojis.length)];
      el.style.left = Math.random() * 100 + 'vw';
      el.style.top = '-5vh';
      const dur = 3 + Math.random() * 4;
      el.style.animationDuration = dur + 's';
      document.body.appendChild(el);
      setTimeout(() => el.remove(), dur * 1000 + 200);
    }
    count++;
    if (count > 25) clearInterval(confettiInterval);
  }, 300);

  // Typewriter subtitle on final page
  const sub = document.getElementById('final-sub');
  const text = 'I love youuuuuu forever 🥰💖🌹';
  let i = 0;
  setTimeout(() => {
    const interval = setInterval(() => {
      sub.textContent += text[i];
      i++;
      if (i >= text.length) clearInterval(interval);
    }, 80);
  }, 1500);

  // Heart burst
  const burst = document.getElementById('final-hearts-burst');
  burst.textContent = '❤️💕💖💗💝🌷🌸✨💫';
}

// ---- "No" button fun: wobble on hover for marriage page ----
function setupNoWiggle() {
  const noBtn = document.getElementById('btn-no-marry');
  if (!noBtn) return;
  noBtn.addEventListener('mouseenter', () => {
    const rand = (Math.random() > 0.5 ? 1 : -1) * (30 + Math.random() * 100);
    const top = Math.random() * (window.innerHeight - 60);
    noBtn.style.transition = 'left 0.3s ease, top 0.3s ease, position 0.3s';
    noBtn.style.position = 'fixed';
    noBtn.style.left = (Math.random() * (window.innerWidth - 120)) + 'px';
    noBtn.style.top = top + 'px';
    noBtn.style.zIndex = '999';
  });
}

// Setup wiggle after a short delay to let DOM settle
setTimeout(setupNoWiggle, 200);

// Re-setup when marriage page shown
const origGoToMarriage = goToMarriage;
window.goToMarriage = function() {
  origGoToMarriage();
  setTimeout(setupNoWiggle, 400);
};
